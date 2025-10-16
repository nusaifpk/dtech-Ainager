import { Briefcase, Rocket, Calendar, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Coworking Spaces",
    description:
      "The heart of Dtec is its flexible workspace. Whether a hot desk, dedicated desk, or a private office, we provide the perfect environment for business setup in Dubai.",
    image: "https://dtecrevamp.wpenginepowered.com/wp-content/uploads/2019/04/coworking-space-picture-small.jpg",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    icon: Rocket,
    title: "Startup Programs",
    description:
      "We provide founder-focused startup programs that help early-stage tech entrepreneurs to grow and scale their businesses with expert mentorship and resources.",
    image: "https://dtecrevamp.wpenginepowered.com/wp-content/uploads/2019/04/intelakBanner-meeting-small.jpg",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    icon: Calendar,
    title: "Events & Learning",
    description:
      "From full conference days to training workshops and networking BBQs, our in-house events will help develop both you and your business ideas.",
    image: "https://dtecrevamp.wpenginepowered.com/wp-content/uploads/2019/04/eventBanner-small.jpg",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
  },
];

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 py-20 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/20 to-purple-200/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            <span className="text-sm font-medium text-slate-600">Our Services</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Dubai Technology
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Entrepreneur Campus
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-600">
            A comprehensive platform for startups, investors and corporates to thrive in the digital age
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
              data-testid={`card-service-${index}`}
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
              
              {/* Image Section */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Icon Overlay */}
                <div className="absolute top-4 right-4">
                  <div className={`rounded-2xl bg-gradient-to-r ${service.gradient} p-3 shadow-lg`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-8">
                <h3 className="mb-4 text-2xl font-bold text-slate-900 group-hover:text-slate-800">
                  {service.title}
                </h3>
                <p className="mb-6 text-slate-600 leading-relaxed">
                  {service.description}
                </p>
                
                {/* CTA Button */}
                <button className={`group/btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${service.gradient} px-6 py-3 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 h-20 w-20 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-xl" />
              <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-gradient-to-tr from-white/20 to-transparent blur-xl" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 rounded-2xl bg-white/80 px-8 py-4 backdrop-blur-sm shadow-lg">
            <div className="flex -space-x-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-slate-900">Join 1,900+ Startups</div>
              <div className="text-sm text-slate-600">Ready to get started?</div>
            </div>
            <button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-white font-semibold transition-all duration-300 hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
