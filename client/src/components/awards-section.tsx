import { Trophy, Award, Star, Medal } from "lucide-react";

const awards = [
  {
    title: "Digital Accelerator of the Year 2018",
    organization: "Digital Excellence Awards",
    year: "2018",
    icon: Trophy,
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "from-yellow-50 to-orange-50",
  },
  {
    title: "Tech Hub of the Year 2018",
    organization: "Enterprise Agility Awards",
    year: "2018",
    icon: Award,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    title: "MENA Fintech Accelerator of the Year 2018",
    organization: "FinX",
    year: "2018",
    icon: Star,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    title: "Startup Incubator/Accelerator of the Year 2017",
    organization: "Arabian Business",
    year: "2017",
    icon: Medal,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    title: "Startup Hub of the Year 2017",
    organization: "Enterprise Agility Awards",
    year: "2017",
    icon: Trophy,
    gradient: "from-red-500 to-pink-500",
    bgGradient: "from-red-50 to-pink-50",
  },
  {
    title: "SME Development 2017",
    organization: "Islamic Economy Award",
    year: "2017",
    icon: Award,
    gradient: "from-indigo-500 to-purple-500",
    bgGradient: "from-indigo-50 to-purple-50",
  },
];

export function AwardsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-20 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-yellow-500/10 to-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/5 to-cyan-500/5 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" />
            <span className="text-sm font-medium text-white/90">Recognition</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-white via-yellow-100 to-orange-100 bg-clip-text text-transparent">
              An Award Winning
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Recognized by industry leaders and organizations for our commitment to innovation and excellence
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm p-8 text-center transition-all duration-500 hover:scale-105 hover:bg-white/20"
              data-testid={`award-${index}`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${award.bgGradient} opacity-0 transition-opacity duration-500 group-hover:opacity-20`} />
              
              {/* Icon */}
              <div className="relative mb-6 flex justify-center">
                <div className={`rounded-2xl bg-gradient-to-r ${award.gradient} p-4 shadow-lg`}>
                  <award.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Year Badge */}
              <div className="relative mb-4">
                <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white/90 backdrop-blur-sm">
                  {award.year}
                </span>
              </div>

              {/* Organization */}
              <div className="relative mb-4 text-sm font-medium text-white/70">
                {award.organization}
              </div>

              {/* Title */}
              <div className="relative text-base font-bold text-white leading-relaxed">
                {award.title}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-xl" />
              <div className="absolute -bottom-2 -left-2 h-12 w-12 rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-xl" />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 rounded-2xl bg-white/10 px-8 py-6 backdrop-blur-sm">
            <div className="text-left">
              <div className="text-2xl font-bold text-white">Excellence Recognized</div>
              <div className="text-white/70">Join an award-winning ecosystem</div>
            </div>
            <div className="h-12 w-px bg-white/20" />
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400" />
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
