import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Mic, Trash2, Sparkles, Zap, MessageCircle, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/use-chat";

// TypeScript declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

export function ChatInterface() {
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const { messages, isLoading, sendMessage, clearChat } = useChat(sessionId);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
          setIsListening(true);
        };
        
        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };
        
        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
        
        recognition.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current = recognition;
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue("");
    // Auto-scroll when sending message
    setTimeout(() => scrollToBottom(), 200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMicClick = () => {
    if (!isSupported) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      // Start listening
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
    }
  };

  return (
    <div className="flex flex-col h-[80vh] sm:h-[75vh] mx-2 sm:mx-0">
      {/* Chat Container */}
      <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 border-b-0 flex-1 flex flex-col">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 sm:-top-20 sm:-right-20 h-20 w-20 sm:h-40 sm:w-40 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 sm:-bottom-20 sm:-left-20 h-20 w-20 sm:h-40 sm:w-40 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-2xl" />
        </div>

        {/* Chat Header */}
        <div className="relative flex items-center justify-between border-b border-white/20 bg-gradient-to-r from-white/40 to-white/20 px-3 py-4 sm:px-6 sm:py-6 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg" data-testid="avatar-ai-header">
                <Bot className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-lg font-bold text-slate-900 truncate" data-testid="text-ai-title">Dtec AI Assistant</h3>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <p className="text-xs sm:text-sm text-slate-600 truncate" data-testid="text-ai-subtitle">Ready to help you explore DTEC</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="rounded-lg sm:rounded-xl bg-white/60 text-slate-600 hover:bg-white/80 hover:text-slate-800 p-2 sm:p-3 backdrop-blur-sm transition-all duration-300 flex-shrink-0"
            data-testid="button-clear-chat"
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
            <span className="hidden sm:inline">Clear</span>
          </Button>
        </div>

        {/* Messages Area */}
        <ScrollArea className="relative flex-1 px-3 py-4 sm:px-6 sm:py-6" ref={scrollAreaRef}>
          <div className="space-y-4 sm:space-y-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center px-2">
                <div className="mb-4 sm:mb-6 flex gap-1 sm:gap-2">
                  <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Zap className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div className="h-8 w-8 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                    <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Welcome to Dtec AI!</h3>
                <p className="text-sm sm:text-base text-slate-600 max-w-sm sm:max-w-md">
                  I'm here to help you learn about DTEC's services, programs, and facilities. 
                  Ask me anything about our coworking spaces, startup programs, or events!
                </p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 sm:gap-4 ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                data-testid={`message-${message.role}-${message.id}`}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg flex-shrink-0" data-testid={`avatar-ai-${message.id}`}>
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                )}
                
                <div className={`flex max-w-[85%] sm:max-w-[80%] flex-col ${message.role === "user" ? "items-end" : "items-start"}`}>
                  <span className={`text-xs font-medium text-slate-500 mb-1 sm:mb-2 ${message.role === "user" ? "text-right" : "text-left"}`} data-testid={`text-label-${message.id}`}>
                    {message.role === "assistant" ? "Dtec AI" : "You"}
                  </span>
                  <div
                    className={`rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 transition-all duration-300 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-white/80 text-slate-800 shadow-md border border-white/40 backdrop-blur-sm"
                    }`}
                    data-testid={`bubble-${message.role}-${message.id}`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap" data-testid={`text-content-${message.id}`}>
                      {message.content}
                    </p>
                  </div>
                </div>

                {message.role === "user" && (
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg flex-shrink-0" data-testid={`avatar-user-${message.id}`}>
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 sm:gap-4 justify-start animate-in fade-in slide-in-from-bottom-2 duration-300" data-testid="typing-indicator">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg flex-shrink-0">
                  <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-500 mb-1 sm:mb-2">Dtec AI</span>
                  <div className="flex items-center gap-2 rounded-xl sm:rounded-2xl bg-white/80 px-3 py-2 sm:px-4 sm:py-3 shadow-md border border-white/40 backdrop-blur-sm">
                    <div className="flex gap-1">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-slate-600 ml-1 sm:ml-2">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Fixed Input Area - Always Visible Footer */}
      <div className="relative bg-gradient-to-r from-white/40 to-white/20 p-3 sm:p-6 rounded-b-2xl sm:rounded-b-3xl shadow-2xl border border-white/20 backdrop-blur-sm">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 shadow-lg flex-shrink-0">
            <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className={`flex flex-1 items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-md border backdrop-blur-sm transition-all duration-300 focus-within:shadow-lg ${
            isListening 
              ? "bg-red-50/80 border-red-200/40 focus-within:bg-red-50/90" 
              : "bg-white/80 border-white/40 focus-within:bg-white/90"
          }`}>
            {isListening && (
              <div className="flex items-center gap-1 text-red-500">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-medium">Listening...</span>
              </div>
            )}
            <input
              type="text"
              placeholder={isListening ? "Speak now..." : "Ask me about DTEC..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading || isListening}
              className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-500 outline-none disabled:opacity-50"
              data-testid="input-message"
            />
          </div>
          {inputValue.trim() ? (
            <Button
              onClick={handleSend}
              disabled={isLoading}
              className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2 sm:px-6 sm:py-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 flex-shrink-0"
              data-testid="button-send"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          ) : (
            <Button
              onClick={handleMicClick}
              disabled={isLoading || !isSupported}
              className={`rounded-xl sm:rounded-2xl px-3 py-2 sm:px-6 sm:py-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 flex-shrink-0 ${
                isListening 
                  ? "bg-gradient-to-r from-red-600 to-pink-600 hover:shadow-red-500/25 animate-pulse" 
                  : "bg-gradient-to-r from-blue-600 to-emerald-600 hover:shadow-green-500/25"
              }`}
              data-testid="button-mic"
            >
              {isListening ? (
                <MicOff className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Mic className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
          <button className="rounded-full bg-white/60 px-2 py-1 sm:px-3 sm:py-1 text-xs text-slate-600 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm">
            <span className="hidden sm:inline">Coworking Spaces</span>
            <span className="sm:hidden">Spaces</span>
          </button>
          <button className="rounded-full bg-white/60 px-2 py-1 sm:px-3 sm:py-1 text-xs text-slate-600 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm">
            <span className="hidden sm:inline">Startup Programs</span>
            <span className="sm:hidden">Programs</span>
          </button>
          <button className="rounded-full bg-white/60 px-2 py-1 sm:px-3 sm:py-1 text-xs text-slate-600 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm">
            Events
          </button>
          <button className="rounded-full bg-white/60 px-2 py-1 sm:px-3 sm:py-1 text-xs text-slate-600 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm">
            Pricing
          </button>
        </div>
      </div>
    </div>
  );
}
