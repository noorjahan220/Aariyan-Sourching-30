import CommonBanner from "../../components/CommonBanner";
import Image from "next/image";

const imgBanner = "/lookbanner.jpg";
const img_0 = "/Premium-Lookbook.jpg";
const img_1 = "/Lookbook-Modern.jpg";
const img_2 = "/Explore-Lookbook.jpg";
const img_3 = "/Fashion-Brand.jpg";
const img_4 = "/Discover.jpg";
const img_5 = "/Get-Inspired.jpg";
const img_6 = "/Lookbook-Custom-Piece.jpg";

const LookBookData = [
  {
    id: 1,
    title: "Aaryan Sourcing Lookbook",
    description: `Discover the perfect custom gear for your brand in Aaryan Sourcing’s lookbook. We have a variety of looks from
very commercial to high fashion in our lookbook that can inspire different types of collections.” We designed Fashion
Look Book 4 to be your next concept and creation inspiration, whether you are starting a new line or not. Every page
of our Lookbook offers a taste of our genius with painted custom closets beyond compare. Browse our garment
collection to show off your brand’s individuality. BEGIN YOUR OWN BRAND – APPAREL BUSINESS, THE
AARYAN WAY`,
    imgUrl: img_1,
  },
  {
    id: 2,
    title: "Explore Our Fashion Lookbook",
    description: `Explore Aaryan Sourcing's fashion lookbooks for custom clothing designs tailored to your fashion company's style.
The clothing you discover can be casual to high-end. Inspire your following collection with our lookbook. Each style
reflects our commitment to designing well-made pieces for your home that are beautiful and timeless. Suppose you
would like to get a taste of having an apparel line designed for your new collection or a men's and women's label. In
that case, our fashion lookbook is perfect to start a new collaboration. It might lead you to your next game-changing
fashion project — or help Aaryan Sourcing bring your dream design into reality.`,
    imgUrl: img_2,
  },
  {
    id: 3,
    title: "Custom Apparel Designs for Fashion Brands",
    description: `Aaryan Sourcing creates custom-designed wear that personifies the personality of your fashion brand. Then our
talented design team will turn your concept into a glamorous design in a range of styles, from subtle to bold, to meet
all of your needs. We make each piece of clothing with individual care just for you. Bespoke We tailor our services
to make you unique in the market, whether you are working from nothing or improving your collection. Nothing is
spared, and no detail is overlooked when we create your company clothes to be a reflection of your brand and mission`,
    imgUrl: img_3,
  },
  {
    id: 4,
    title: "Discover Our Latest Collections",
    description: `
Discover our new arrivals: men's custom tailor-made clothing by Aaryan Sourcing. We thoughtfully curate our product
mix of classic and on-trend styles so you can easily find the perfect pair for your business. We design and create all
our items with your desires in mind. We use the best fabrics available for your daily needs, offering both comfort and
style! We provide clothing collections to enable you to kick off a bold new design or widen your portfolio with some
more versatile staples. Aaryan Sourcing will help you design outfits that attract your target consumer and enhance
your branding. Click here to purchase your favorite fashion items for your next work.`,
    imgUrl: img_4,
  },
  {
    id: 5,
    title: "Get Inspired by High-Quality Apparel Designs",
    description: `Discover our new arrivals: men's custom tailor-made clothing by Aaryan Sourcing. We thoughtfully curate our product
mix of classic and on-trend styles so you can easily find the perfect pair for your business. We design and create all
our items with your desires in mind. We use the best fabrics available for your daily needs, offering both comfort and
style! We provide clothing collections to enable you to kick off a bold new design or widen your portfolio with some
more versatile staples. Aaryan Sourcing will help you design outfits that attract your target consumer and enhance
your branding. Click here to purchase your favorite fashion items for your next work.`,
    imgUrl: img_5,
  },
  {
    id: 6,
    title: "Lookbook for Custom Fashion Pieces",
    description: `A fashion lookbook is available on Aaryan Sourcing. Snippet: The special blend of custom and clothing lines featured
in the lookbook gives you exactly the options you have been longing for in a chill beach feel. Each design is
meticulously prepared to capture the organic aspects of trends, while maintaining the allure of standing the test of
time, ensuring you determine precisely what would be perfect for your following collection. We hope you're inspired
by our fashion lookbook when setting up for a new collection or reworking a current one. We will assist you in
developing a custom clothing design that appeals to your target market and adds value to your brand with premium
apparel. Browse our lookbook and get started with fashion design today.`,
    imgUrl: img_6,
  },
];

const Book = () => {
  return (
    <main>
      <CommonBanner backgroundImage={imgBanner} breadcrumb={"Lookbook"} />

      <section className="max-w-6xl mx-auto px-4 lg:px-2 py-12 space-y-16">
        <div className="mb-50">
          <Image
            alt="Aaryan Sourcing - Premium Apparel Lookbook for Trendy Clothing_compressed"
            src={img_0}
            width={1300}
            height={800}
          />
          <p className="pt-5">
            Find the best custom clothing designs for your line in Aaryan
            Sourcing's beautiful lookbooks! Inspiration for our fashion
            lookbook. Our thoughtfully selected fashion inspirations will get
            your creative juices flowing with both high street and high fashion
            designs to behold. Whether for business or pleasure, whether
            everyday wardrobe essentials or special pieces, our lookbook offers
            a plethora of options to inspire you. Explore our clothing line to
            discover how we can create custom trends for your label. We offer a
            variety of options for customers to imagine what they want, and as
            long as you type, we can offer! At Aaryan Sourcing, we understand
            the importance of dressing appropriately for your audience. We
            developed a hip lookbook for brand visioning. And all of our
            clothing demonstrates our dedication to well-made, quality items.
            Our lookbook might inspire you to expand or start a new line.
            Explore our clothes lookbook and connect with Aaryan Sourcing for a
            personalized fashion line. Our staff can assist you in creating your
            own, original clothing
          </p>
        </div>

        {LookBookData.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center min-h-[400px]"
          >
            <div
              className={`flex flex-col h-full ${
                index % 2 === 0 ? "md:order-1" : "md:order-2"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-700 text-base leading-relaxed text-justify">
                {item.description}
              </p>
            </div>

            <div
              className={`w-full h-full relative ${
                index % 2 === 0 ? "md:order-2" : "md:order-1"
              }`}
            >
              <img
                src={item.imgUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Book;
