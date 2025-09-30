import CommonBanner from "../../components/CommonBanner";
import Image from "next/image";

const bannerImg = "/print-embroidery.jpg";
const img_1 = "/Custom-Apparal-Printing.jpg";
const img_2 = "/Custom-Printing-Embroidery.jpg";
const img_3 = "/Apparal-Printing-Service.jpg";
const img_4 = "/Custom-Embroydary-Fashion.jpg";
const img_5 = "/Highquality-Screen.jpg";
const img_6 = "/Embroydary-Design.jpg";
const img_7 = "/Custom-Printing-Service.jpg";
const img_8 = "/Fast-Turn-Around.jpg";

const printingEmbroideryData = [
  {
    id: 2,
    title: "Custom Printing & Embroidery for Apparel",
    description:
      "Aaryan Sourcing - Personalise your fashion brand with custom printing and embroidery. We offer everything from brand embroidery to colorful printed designs. We establish sharp, appealing, and long-lasting designs that utilize the most recent screen printing and heat transfer technologies. Your firm's uniform, teamwear and promotional items look top-notch with our full range of embroidered apparel. We create custom embroidered logos, lettering, and intricate designs that are guaranteed to last. Our embroidery on your polo shirt, jacket or headwear will look clean yet stand up to wash after wash. The custom printing looks awesome with cheerful images. We can print designs, pictures or logos with extreme detail on many different materials to make your idea a reality.",
    imgUrl: img_2,
  },
  {
    id: 3,
    title: "Apparel Printing Services",
    description:
      "Aaryan Sourcing: It prints custom clothes for any occasion. Showcase your logo t-shirt and apparel graphics. We offer tough logos, screen prints, and full colour for sublimation to match your ideas. Mass printing is perfect for companies, sports teams, and school spirit. The company with unique uniforms, workwear and branded clothing printing to make your brand stand out! Our professionals create prints on our washable, wear-resistant technology. Our shirts and sweatshirts make the perfect gift for any occasion. Our designs are available on a wide range of apparel, including tank tops, t-shirts, sweatshirts, and hoodies.",
    imgUrl: img_3,
  },
  {
    id: 4,
    title: "Custom Embroidery for Fashion Brands",
    description:
      "Aaryan Sourcing specializes in custom embroidery that distinguishes your organisation. Our pros print with the latest technology to ensure durable and washable prints. Custom uniforms, workwear, and branded apparel are our forte. We bring your imagination to life with bold patterns and full-colour graphics. Businesses, athletic teams, schools, and organizations of all sizes will love our embroidered t-shirts, hoodies, caps, and coats. Aaryan Sourcing prints custom clothing for any budget, sense of style, or deadline, ensuring people in your audience will enjoy wearing our well-made garments.",
    imgUrl: img_4,
  },
  {
    id: 5,
    title: "High-Quality Screen Printing",
    description:
      "Custom clothes printing at great prices, with reliable delivery courtesy of Aaryan Sourcing. Our screen print service uses opaque, water-based, and long-lasting inks, providing that fabulously vivid design on t-shirts, sweatshirts, promotional wear, and corporate clothing. State-of-the-art screen printing produces crisp images and a durable design on cotton, polyester, and blended fabrics. Mass screen printing also enhances businesses, schools, sports teams, and events by providing crisp logos, images, and text. We print professional-looking promo, team, and bespoke clothing that will exceed your expectations.",
    imgUrl: img_5,
  },
  {
    id: 6,
    title: "Embroidery Designs for Your Apparel",
    description:
      "Aaryan Sourcing offers a premium custom embroidery service, adding richness and a unique look to your clothing. We customize business logos, text embroidery & complicated designs to enrich company clothing, sports teams, and uniforms. We expertly embroider on t-shirts, polos, jackets, hats, and bags. Our pro embroiderers carefully and precisely sew remnants of brilliant colour on diverse fabrics. With custom embroidery, corporate logos, items to express team spirit, and gifts, you can look professional and stand out.",
    imgUrl: img_6,
  },
  {
    id: 7,
    title: "How We Handle Custom Apparel Printing & Embroidery",
    description:
      "Aaryan Sourcing puts plenty of effort into how it prints and embroiders clothes. We take a very measured approach to custom t-shirt printing, embroidered logos and clothing graphic design. The process starts with your design, which we can apply via screen, heat transfer, and/or sublimation prints in lovely lasting colours. Logos, text and designs are embroidered with advanced high-performance machines. Our staff produces corporate-specific apparel, event items, and gifts. We offer unique design recommendations to assist you in achieving your vision, both aesthetically and functionally.",
    imgUrl: img_7,
  },
  {
    id: 8,
    title: "Fast Turnaround for Printing & Embroidery Orders",
    description:
      "Our objective is not to deliver more cheaply, but faster with quality. We can create custom t-shirts, embroidered logos and apparel graphics at a fast pace thanks to our efficient process. Sublimation, thermal transfer, and screen printing produce beautiful results quickly. Small orders can be handled the same day or the next day, and larger orders can be processed without compromising quality. We meet small and large-scale custom embroidery deadlines fast. Aaryan Sourcing offers fast and dependable custom clothing, meeting deadlines with quick production, low prices and high-quality products.",
    imgUrl: img_8,
  },
];

const PrintingEmbroidery = () => {
  return (
    <main>
      <CommonBanner
        backgroundImage={bannerImg}
        breadcrumb={"PrintingEmbroidery"}
      />

      <section className=" max-w-6xl mx-auto px-4 lg:px-2 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="w-full h-full relative aspect-[16/9]">
            <Image
              src={img_1}
              alt="Custom Apparel Printing and Embroidery"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>

          <div>
            <p className="text-gray-700 text-base leading-relaxed text-start">
              We specialise in helping to make your brand pop! Aaryan Sourcing
              creates premium branded apparel with custom embroidery and print.
              We imprint clothes and print promo products, but we also customize
              event uniforms. Our Staff brings new technology to get you the
              best look and long-lasting garments. Your clothes will be
              embroidered with our custom design. They work great for
              embroidering your company’s logo on work shirts or for designing
              decorations on your outer jacket/blouse. The team aims for nothing
              less than quality products, service and prices. At Aaryan
              Sourcing, we believe in quality, productivity and innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black px-4 lg:px-2 py-10 flex justify-center text-center text-lg capitalize font-semibold text-gray-100 my-4">
        <p>Bringing Your Designs to Life with Precision and Artistry.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-2 py-12 space-y-16">
        {printingEmbroideryData.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center"
          >
            <div
              className={`flex flex-col justify-center h-full ${
                index % 2 === 0 ? "md:order-1" : "md:order-2"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed text-justify">
                {item.description}
              </p>
            </div>

            <div
              className={`w-full h-full relative aspect-[16/9] ${
                index % 2 === 0 ? "md:order-2" : "md:order-1"
              }`}
            >
              <Image
                src={item.imgUrl}
                alt={item.title}
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default PrintingEmbroidery;
