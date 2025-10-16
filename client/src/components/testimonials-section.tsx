import { Quote, Star, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Dtec has been an ideal home for Shortpoint. With great learning and networking opportunities, Dtec provides the perfect platform to help you build, work and launch your idea.",
    author: "Sami AlSayyed",
    company: "Shortpoint",
    role: "Founder & CEO",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    quote:
      "Dtec is what we, at Clip the Deal, call HOME. This is where our startup took shape and with tremendous support, mentoring and funding from Dtec, it has grown to what it is today.",
    author: "Padam Chhabra",
    company: "Clip the Deal",
    role: "Co-Founder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    gradient: "from-purple-500 to-pink-500",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-20 md:py-32">
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
            <span className="text-sm font-medium text-slate-600">Testimonials</span>
          </div>
          <h2 className="font-heading text-4xl font-bold text-slate-900 md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Members
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Speak
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-600">
            Hear from our community of successful entrepreneurs and innovators
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
              data-testid={`testimonial-${index}`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
              
              {/* Quote Icon */}
              <div className="relative mb-6">
                <div className={`inline-flex rounded-2xl bg-gradient-to-r ${testimonial.gradient} p-3 shadow-lg`}>
                  <Quote className="h-6 w-6 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="relative mb-6 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative mb-8 text-lg italic leading-relaxed text-slate-700">
                "{testimonial.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="relative flex items-center gap-4">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="h-16 w-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                  <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-gradient-to-r ${testimonial.gradient} ring-2 ring-white`} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                  <div className="text-sm font-medium text-slate-500">{testimonial.company}</div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 h-20 w-20 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-xl" />
              <div className="absolute -bottom-2 -left-2 h-16 w-16 rounded-full bg-gradient-to-tr from-white/20 to-transparent blur-xl" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 rounded-2xl bg-white/80 px-8 py-6 backdrop-blur-sm shadow-lg">
            <div className="text-left">
              <div className="text-2xl font-bold text-slate-900">Ready to Join Our Community?</div>
              <div className="text-slate-600">Be part of the success stories</div>
            </div>
            <div className="h-12 w-px bg-slate-200" />
            <button className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              <span>Get Started Today</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
