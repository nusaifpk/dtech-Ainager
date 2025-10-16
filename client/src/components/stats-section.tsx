import { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, Calendar, Briefcase } from "lucide-react";

const stats = [
  { 
    value: 1900, 
    suffix: "+", 
    label: "Startups", 
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50"
  },
  { 
    value: 100, 
    suffix: "+", 
    label: "Nationalities", 
    icon: Users,
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50"
  },
  { 
    value: 200, 
    suffix: "+", 
    label: "Events Annually", 
    icon: Calendar,
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50"
  },
  { 
    value: 11800, 
    suffix: "+", 
    label: "Jobs Created", 
    icon: Briefcase,
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50"
  },
];

function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="font-heading text-4xl font-bold md:text-5xl lg:text-6xl">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-20 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400" />
            <span className="text-sm font-medium text-white/90">Our Impact</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              An Innovation
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Oasis
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/80 leading-relaxed">
            Located in the heart of Dubai Silicon Oasis, Dubai's integrated technology free zone,
            Dtec is at the epicenter of entrepreneurship and innovation in the UAE.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm p-8 text-center transition-all duration-500 hover:scale-105 hover:bg-white/20"
              data-testid={`stat-${index}`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 transition-opacity duration-500 group-hover:opacity-20`} />
              
              {/* Icon */}
              <div className="relative mb-6 flex justify-center">
                <div className={`rounded-2xl bg-gradient-to-r ${stat.color} p-4 shadow-lg`}>
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Animated Counter */}
              <div className="relative mb-4">
                <AnimatedCounter 
                  end={stat.value} 
                  duration={2000 + index * 200}
                  suffix={stat.suffix}
                />
              </div>

              {/* Label */}
              <div className="relative text-sm font-semibold text-white/90 md:text-base">
                {stat.label}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-xl" />
              <div className="absolute -bottom-2 -left-2 h-12 w-12 rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-xl" />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 rounded-2xl bg-white/10 px-8 py-6 backdrop-blur-sm">
            <div className="text-left">
              <div className="text-2xl font-bold text-white">Join the Innovation Revolution</div>
              <div className="text-white/70">Be part of the largest tech ecosystem in the Middle East</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <button className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-3 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25">
              Explore Opportunities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
