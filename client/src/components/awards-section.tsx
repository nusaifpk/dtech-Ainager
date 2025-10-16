const awards = [
  {
    title: "Digital Accelerator of the Year 2018",
    organization: "Digital Excellence Awards",
  },
  {
    title: "Tech Hub of the Year 2018",
    organization: "Enterprise Agility Awards",
  },
  {
    title: "MENA Fintech Accelerator of the Year 2018",
    organization: "FinX",
  },
  {
    title: "Startup Incubator/Accelerator of the Year 2017",
    organization: "Arabian Business",
  },
  {
    title: "Startup Hub of the Year 2017",
    organization: "Enterprise Agility Awards",
  },
  {
    title: "SME Development 2017",
    organization: "Islamic Economy Award",
  },
];

export function AwardsSection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-semibold text-foreground md:text-4xl">
            An Award Winning Ecosystem
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award, index) => (
            <div
              key={index}
              className="rounded-md border border-border bg-card p-6 text-center transition-all hover-elevate"
              data-testid={`award-${index}`}
            >
              <div className="mb-2 text-sm font-medium text-primary">
                {award.organization}
              </div>
              <div className="text-base font-semibold text-card-foreground">
                {award.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
