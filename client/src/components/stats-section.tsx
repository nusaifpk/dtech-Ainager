const stats = [
  { value: "1,900+", label: "Startups" },
  { value: "100+", label: "Nationalities" },
  { value: "200+", label: "Events Annually" },
  { value: "11,800+", label: "Jobs Created" },
];

export function StatsSection() {
  return (
    <section className="bg-card py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-semibold text-card-foreground md:text-4xl">
            An Innovation Oasis
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground leading-relaxed">
            Located in the heart of Dubai Silicon Oasis, Dubai's integrated technology free zone,
            Dtec is at the epicenter of entrepreneurship and innovation in the UAE.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center" data-testid={`stat-${index}`}>
              <div className="font-heading text-4xl font-bold text-primary md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-muted-foreground md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
