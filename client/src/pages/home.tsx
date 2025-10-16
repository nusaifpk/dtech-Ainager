import { useState, useEffect, useRef } from "react";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { StatsSection } from "@/components/stats-section";
import { AwardsSection } from "@/components/awards-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ChatInterface } from "@/components/chat-interface";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const chatTriggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowChat(true);
            // Remove the automatic scroll to prevent interrupting user's natural scroll flow
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (chatTriggerRef.current) {
      observer.observe(chatTriggerRef.current);
    }

    return () => {
      if (chatTriggerRef.current) {
        observer.unobserve(chatTriggerRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <AwardsSection />
      <TestimonialsSection />
      
      {/* Small trigger point for chat section */}
      <div ref={chatTriggerRef} className="h-20" />
      
      {/* Chat Interface Section */}
      {showChat && (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-20 md:py-32">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl" />
          </div>
          
          <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-16 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 backdrop-blur-sm">
                  <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                  <span className="text-sm font-medium text-slate-600">AI Assistant</span>
                </div>
                <h2 className="font-heading text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                    Chat with
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Dtec AI
                  </span>
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-600">
                  Ask me anything about our services, programs, and facilities
                </p>
              </div>
              <ChatInterface />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
