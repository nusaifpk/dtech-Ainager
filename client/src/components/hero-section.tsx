export function HeroSection() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src="https://dtecrevamp.wpenginepowered.com/wp-content/uploads/2024/12/dtec-website-frontpage-picture-shared-desk-1-1.jpg"
          alt="DTEC Coworking Space"
          className="h-full w-full object-cover"
          data-testid="img-hero"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="max-w-5xl text-center">
          <h1 className="font-heading text-5xl font-bold text-white md:text-6xl lg:text-7xl" data-testid="text-hero-title">
            Welcome to Dtec
          </h1>
          <p className="mt-4 text-xl text-white/90 md:text-2xl lg:mt-6" data-testid="text-hero-subtitle">
            The largest tech startup coworking campus in the Middle East
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base text-white/80 md:text-lg" data-testid="text-hero-description">
            An integrated entrepreneurial ecosystem providing everything you need to set up a new
            business in Dubai. Find coworking space, get company formation help, and join our
            events.
          </p>
        </div>
      </div>
    </section>
  );
}
