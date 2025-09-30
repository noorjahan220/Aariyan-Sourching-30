const CommitmentsSection = () => {
  const img_1 =
    "https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fplanet%2Fplanet-01.jpg&w=1080&q=75";
  const img_2 =
    "https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fplanet%2Fplanet-02.jpg&w=1080&q=75";
  const img_3 =
    "https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fplanet%2Fplanet-03.jpg&w=1080&q=75";
  const img_4 =
    "https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fplanet%2Fplanet-04.jpg&w=1080&q=75";
  const img_5 =
    "https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fplanet%2Fplanet-05.jpg&w=1080&q=75";
  const img_6 =
    "https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fplanet%2Fplanet-06.jpg&w=1080&q=75";
  const img_7 =
    "https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fplanet%2Fplanet-07.jpg&w=1080&q=75";
  const img_8 =
    "https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fplanet%2Fplanet-08.jpg&w=1080&q=75";
  const img_9 =
    "https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fplanet%2Fplanet-09.jpg&w=1080&q=75";
  const img_10 =
    "https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fplanet%2Fplanet-10.jpg&w=1080&q=75";
  const img_11 =
    "https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fplanet%2Fplanet-11.jpg&w=1080&q=75";
  const img_12 =
    "https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fplanet%2Fplanet-12.jpg&w=1080&q=75";
  const planetImages = [
    { src: img_1, alt: "Planet Commitment 1" },
    { src: img_2, alt: "Planet Commitment 2" },
    { src: img_3, alt: "Planet Commitment 3" },
    { src: img_4, alt: "Planet Commitment 4" },
    { src: img_5, alt: "Planet Commitment 5" },
    { src: img_6, alt: "Planet Commitment 6" },
    { src: img_7, alt: "Planet Commitment 7" },
    { src: img_8, alt: "Planet Commitment 8" },
    { src: img_9, alt: "Planet Commitment 9" },
    { src: img_10, alt: "Planet Commitment 10" },
    { src: img_11, alt: "Planet Commitment 11" },
    { src: img_12, alt: "Planet Commitment 12" },
  ];

  return (
    <section className="bg-gradient-to-t from-[#01140D] via-[#002B1D] to-[#002B1D] mb-10 flex justify-center items-center py-12 sm:py-16 md:py-20 px-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 md:gap-10">
        {/* Left hero */}
        <div
          className="relative w-full lg:w-[40%] h-[420px] sm:h-[500px] lg:h-[560px] bg-cover bg-center rounded-3xl overflow-hidden shrink-0"
          style={{
            backgroundImage:
              "url('https://www.aasourcingltd.com/_next/image?url=%2Fimages%2Fother%2FourPlanet.jpg&w=1080&q=75')",
          }}
          aria-label="Our Promise background"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative h-full flex items-end justify-start p-6 sm:p-10">
            <div className="text-white max-w-md">
              <p className="text-[22px] sm:text-[26px] md:text-[30px] font-semibold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Our Promise: Quality Apparel
                <br />
                with a Sustainable Future
              </p>
              <div className="mt-8">
                <h3 className="text-2xl font-bold tracking-wider text-[#38E5B1]">
                  OUR COMMITMENTS
                </h3>
                <p className="mt-1 text-sm font-medium tracking-[0.2em] text-white/90">
                  FOR YOU AND OUR PLANET
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right grid */}
        <div className="w-full grid gap-3 sm:gap-4 grid-cols-3 sm:grid-cols-4">
          {planetImages.map((image, index) => (
            <div
              key={index}
              className="
                group relative aspect-square rounded-xl overflow-hidden
                border border-white/15 ring-1 ring-white/10
                bg-white/5 backdrop-blur-md
                shadow-[0_6px_20px_rgba(0,0,0,0.35)]
                transition-all duration-300
                hover:bg-white/8 hover:ring-white/25
                hover:shadow-[0_10px_28px_rgba(0,0,0,0.45)]
                focus-within:ring-white/40
              "
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent"
              />
              <div className="relative flex items-center justify-center w-full h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="
                    w-[70%] h-[70%] object-contain
                    drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]
                    transition-transform duration-300
                    group-hover:scale-[1.03]
                    will-change-transform
                  "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitmentsSection;
