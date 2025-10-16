import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "Dtec has been an ideal home for Shortpoint. With great learning and networking opportunities, Dtec provides the perfect platform to help you build, work and launch your idea.",
    author: "Sami AlSayyed",
    company: "Shortpoint",
  },
  {
    quote:
      "Dtec is what we, at Clip the Deal, call HOME. This is where our startup took shape and with tremendous support, mentoring and funding from Dtec, it has grown to what it is today.",
    author: "Padam Chhabra",
    company: "Clip the Deal",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-card py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-semibold text-card-foreground md:text-4xl">
            Members Speak
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-elevate" data-testid={`testimonial-${index}`}>
              <CardContent className="p-8">
                <Quote className="mb-4 h-10 w-10 text-primary opacity-50" />
                <p className="mb-6 text-base italic leading-relaxed text-card-foreground">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-card-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
