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
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <AwardsSection />
      <TestimonialsSection />
      
      {/* Scroll trigger point at 60vh */}
      <div ref={chatTriggerRef} className="h-[60vh]" />
      
      {/* Chat Interface */}
      {showChat && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ChatInterface />
        </div>
      )}
    </div>
  );
}
