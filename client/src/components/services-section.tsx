import { Briefcase, Rocket, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Briefcase,
    title: "Coworking Spaces",
    description:
      "The heart of Dtec is its flexible workspace. Whether a hot desk, dedicated desk, or a private office, we provide the perfect environment for business setup in Dubai.",
    image: "https://dtecrevamp.wpenginepowered.com/wp-content/uploads/2019/04/coworking-space-picture-small.jpg",
  },
  {
    icon: Rocket,
    title: "Startup Programs",
    description:
      "We provide founder-focused startup programs that help early-stage tech entrepreneurs to grow and scale their businesses with expert mentorship and resources.",
    image: "https://dtecrevamp.wpenginepowered.com/wp-content/uploads/2019/04/intelakBanner-meeting-small.jpg",
  },
  {
    icon: Calendar,
    title: "Events & Learning",
    description:
      "From full conference days to training workshops and networking BBQs, our in-house events will help develop both you and your business ideas.",
    image: "https://dtecrevamp.wpenginepowered.com/wp-content/uploads/2019/04/eventBanner-small.jpg",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">
            Dubai Technology Entrepreneur Campus
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            A platform for startups, investors and corporates
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover-elevate" data-testid={`card-service-${index}`}>
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <service.icon className="h-8 w-8 text-primary" />
                  <h3 className="font-heading text-xl font-semibold text-card-foreground">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
