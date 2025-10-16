import OfficeImg from "@/assets/office.webp";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Hero Image with enhanced overlay */}
        <div className="absolute inset-0">
          <img
            src={OfficeImg}
            alt="DTEC Coworking Space"
            className="h-full w-full object-cover"
            data-testid="img-hero"
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-2xl animate-pulse delay-500" />
        </div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-bounce delay-300">
          <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="absolute top-32 right-20 animate-bounce delay-700">
          <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
            <Users className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 left-20 animate-bounce delay-1000">
          <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
            <Zap className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="max-w-6xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-white/90">Innovation Hub • Dubai Silicon Oasis</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-6xl font-bold leading-tight text-white md:text-7xl lg:text-8xl" data-testid="text-hero-title">
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Welcome to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              DTEC
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-4xl text-2xl font-medium text-white/90 md:text-3xl lg:mt-8" data-testid="text-hero-subtitle">
            The largest tech startup coworking campus in the Middle East
          </p>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/80 md:text-xl" data-testid="text-hero-description">
            An integrated entrepreneurial ecosystem providing everything you need to set up a new
            business in Dubai. Find coworking space, get company formation help, and join our
            events.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
              <span className="relative z-10 flex items-center gap-2">
                Explore Our Space
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
            
            <button className="rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-white font-semibold backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50">
              Learn More
            </button>
          </div>

          {/* Stats Preview */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl">1,900+</div>
              <div className="text-sm text-white/70">Startups</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl">100+</div>
              <div className="text-sm text-white/70">Nationalities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl">200+</div>
              <div className="text-sm text-white/70">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white md:text-4xl">11,800+</div>
              <div className="text-sm text-white/70">Jobs Created</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="animate-bounce">
          <div className="h-6 w-4 rounded-full border-2 border-white/50">
            <div className="mx-auto mt-2 h-1 w-1 rounded-full bg-white/50 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
