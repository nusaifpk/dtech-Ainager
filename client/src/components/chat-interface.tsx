import { useState, useRef, useEffect } from "react";
import { Bot, Send, Paperclip, Mic, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/use-chat";

export function ChatInterface() {
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, isLoading, sendMessage, clearChat } = useChat(sessionId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto mb-20 mt-12 max-w-4xl px-4">
      <div className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-900/50 backdrop-blur-sm shadow-xl">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/20" data-testid="avatar-ai-header">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-white" data-testid="text-ai-title">AI Assistant</h3>
              <p className="text-xs text-gray-400" data-testid="text-ai-subtitle">Ask me about DTEC</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-gray-400 hover:text-white hover-elevate"
            data-testid="button-clear-chat"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Chat
          </Button>
        </div>

        {/* Messages Area */}
        <ScrollArea className="h-[500px] px-6 py-6" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
                data-testid={`message-${message.role}-${message.id}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 ring-2 ring-primary/20" data-testid={`avatar-ai-${message.id}`}>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`flex max-w-[70%] flex-col gap-1 ${message.role === "user" ? "items-end" : "items-start"}`}>
                  {message.role === "assistant" && (
                    <span className="text-xs text-gray-400" data-testid={`text-label-${message.id}`}>AI Assistant</span>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-md transition-all ${
                      message.role === "user"
                        ? "bg-blue-600 text-white shadow-blue-600/20"
                        : "bg-gray-800 text-gray-100 shadow-gray-900/50"
                    }`}
                    data-testid={`bubble-${message.role}-${message.id}`}
                  >
                    <p className="text-base leading-relaxed whitespace-pre-wrap" data-testid={`text-content-${message.id}`}>
                      {message.content}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500" data-testid={`text-timestamp-${message.id}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {message.role === "user" && (
                  <div className="self-end mb-1 text-xs text-gray-400" data-testid={`text-label-user-${message.id}`}>You</div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start animate-in fade-in slide-in-from-bottom-2 duration-200" data-testid="typing-indicator">
                <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1 rounded-2xl bg-gray-800 px-4 py-3 shadow-md shadow-gray-900/50">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" />
                  <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" style={{ animationDelay: '0.2s' }} />
                  <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-700 bg-gray-900/70 p-4">
          <div className="flex items-end gap-2">
            <div className="flex flex-1 items-center gap-2 rounded-2xl border border-gray-700 bg-gray-900/50 px-4 py-2 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none disabled:opacity-50"
                data-testid="input-message"
              />
              <button 
                className="text-gray-400 transition-all hover:text-gray-300 hover:scale-110" 
                data-testid="button-attach"
                disabled={isLoading}
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button 
                className="text-gray-400 transition-all hover:text-gray-300 hover:scale-110" 
                data-testid="button-voice"
                disabled={isLoading}
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="h-10 w-10 rounded-full bg-blue-600 p-0 transition-all hover:bg-blue-700 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-blue-600/30"
              data-testid="button-send"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
