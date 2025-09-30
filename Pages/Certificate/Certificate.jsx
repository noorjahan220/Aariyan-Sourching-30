import CommonBanner from "../../components/CommonBanner";

const img_1 = "/certificate.jpg";
const img_2 = "/Industry-Leading.jpg";
const img_3 = "/Why-Matter.jpg";
const img_4 = "/Global-Certification.jpg";
const img_5 = "/Complience.jpg";
const img_6 = "/Sustainable-Apparale-Certificate.jpg";
const img_7 = "/Certified-Quality-Control.jpg";
const banner_certificate = "/certificatebanner.jpg";

const certificateData = [
  {
    id: 1,
    title: "Our Certifications & Quality Standards",
    image: img_1,
    description: `Aaryan Sourcing values ethical and quality production. (XS-3XL) The syndicate: BSCI, OEKO-TEX®, SEDEX, and
WRAP guarantee environmentally friendly and socially responsible clothing production. We maintain ISO 9001:2015
Quality Management, which verifies that our products are consistently produced and controlled to an established level
of quality. (2) Every process must pass the QC test, so every process needs a professional person to operate. (3) The
material must be clean, smooth, and have no quality issues. Local manufacturers are also excellent, in strict accordance
with the quality standards set by international standards. We are a verified, worker-welfare-driven, sustainable, and
product-integrity-based producer that serves as a trusted partner to international fashion brands.`,
  },
  {
    id: 2,
    title: "Industry-Leading Apparel Certifications",
    image: img_2,
    description: `Production Process and Design: Aryan Sourcing complies with global policies and standards of fashion and quality.
Our cult clothes are environmentally friendly and affordable. Unlike others, which are filled with toxic, harmful
chemicals and dyes, we keep ours chemical and fabric-friendly by using GOTS, OEKO-TEX, and GRS certified
fabrics and coloring them with safe, non-flammable, chemical-free, kid-friendly dyes only! All of our environmental
and occupational health certifications are based on ISO 14001 and 45001. Global retailers and fashion partners who
work with us have access to clothing with certifications even higher than the industry requirements that pay testament
to our commitment to transparency, sustainable apparel sourcing, and quality manufacturing.`,
  },
  {
    id: 3,
    title: "Why Certifications Matter for Your Apparel Business",
    image: img_3,
    description: `Certifications instill trust, standardize compliance, and open global markets. Aaryan Sourcing. Adopts GOTS, OEKO-
TEX, WRAP, and BSCI to monitor and manage garment production, and also accords with the human-ecological
requirement (CONFIDENCE IN TEXTILES) product standard. They verify the quality and responsible sourcing of
clothing for both retailers and consumers. Licensed products signal brand value and a level of trust in a worldwide
marketplace. We achieve this by working with a certified factory that complies with international regulations,
providing our clients with a cleaner, more sustainable, and safer option for the environment.`,
  },
  {
    id: 4,
    title: "Global Sourcing Certifications",
    image: img_4,
    description: `We are a general sourcing store, but Aaryan Sourcing has earned your trust through our good certificates. These
certifications are quality management according to ISO 9001; environmental management according to ISO 14001,
and textile chemical safety as per OEKO-TEX®. Additionally, we are certified by GOTS, GRS, WRAP, and BSCI,
which focus on sustainable production, ethical labour conditions, and supply chain transparency. These certifications
are evidence of our commitment to sustainability and our adherence. About Us Aaryan Sourcing is a well-reputed
manufacturer and exporter of all kinds of knitted, woven and sweater garments with an extensive range of product
categories.`,
  },
  {
    id: 5,
    title: "Compliance with Manufacturing Standards",
    image: img_5,
    description: `Aaryan Sourcing is more of the same: the clothing manufacturing business that has been built around pure conformity.
To maintain an ethical working environment, the safety of the workers, combined with its quality, is followed in
accordance with WRAP, BSCI, SEDEX, and ISO9001. We do this every month to continue serving the global demand
on the buyer side and drive transparency. We tick a lot of boxes, from ISO 14001 environment management
certification to OEKO-TEX® chemical-free certification. This no-holds-barred dedication protects your brand and
guarantees that each garment we create for you adheres to the highest safety, sustainability, and worldwide ecological
apparel production standards available.`,
  },
  {
    id: 6,
    title: "Certifications for Sustainable Apparel Production",
    image: img_6,
    description: `Aaryan Sourcing is a fashion brand rooted in sustainability. We’re proud of each of our sustainable, ethical, and
socially responsible accreditations. Our sourcing and production adhere to the world’s most stringent wellness
standards for organic fiber, traceability of materials (FAIRTRADE), recyclable materials, and safe chemical use –
including certifications such as GOTS, GRS, and OEKO-TEX®. We are also WRAP association members and BSCI
certified, and all of our products are too. “Your team is your dream. “Our garments are: 1. Now that these certifications
are in place, our partners can have confidence in environmentally friendly, new sustainable apparel fashion desired by
their customers and designed to promote a high-quality clothing supply`,
  },
  {
    id: 7,
    title: "Certified Quality Control and Ethical Sourcing",
    image: img_7,
    description: `Aaryan Sourcing. They continue to combat sweatshops by pairing responsible clothing sourcing with certified plant
quality control. We maintain a quality policy that strictly adheres to ISO 9001 standards, from raw material milling
and external crushing through sifting and warehousing, ensuring readiness for shipment. Consciously sourced, Fire-
retardant, and approved by BSCI, WRAP, and SEDEX, ethical labour wages, safe working conditions, and sustainable
labor practices. We use OEKO-TEX® and GOTS-certified materials for peace of mind about chemical safety and
sustainability. Through these certifications, we make sure to create great clothing and keep our supply chains as
transparent as possible and also socially and environmentally responsible everywhere`,
  },
];

const Certificate = () => {
  return (
    <main>
      <CommonBanner
        breadcrumb={"Certificate"}
        backgroundImage={banner_certificate}
      ></CommonBanner>

      <section className=" max-w-6xl mx-auto  px-4 lg:px-2 py-8 ">
        <div className="max-w-6xl mx-auto mb-10">
          <div>
            <p className="mt-4 text-gray-700 text-base  leading-relaxed text-justify">
              Aaryan Sourcing cloth quality standards. You, the earth, and your
              clothing makers deserve better. We are a wholesale ethical
              clothing company that guarantees our garments are of a high
              standard, made with ethics, and not exploited through
              certifications and production methods. Our most recent
              accreditations reflect our commitment to the world's leading
              garment standards. Quality and sourcing certificates certify our
              fair sourcing and the production of sustainably manufactured
              goods. They signal that we not only meet but consistently exceed
              global standards throughout our production, from OEKO-TEX and
              GOTS-certified sustainable materials to WRAP and BSCI-mandated
              social accountability. Quality and transparency are the No.1
              priority for Aaryan Sourcing. As with everything we make, we
              source worldwide for safe working conditions, fair or even
              above-average hours, and environmentally friendly materials. These
              values enable us to deliver ethical and quality standards that our
              clients expect. By downloading certificates from this page, you
              identify that you comply with our global standards and moral
              origins. Inquire about any certification. We are excited to
              highlight our eco-friendly practices and initiatives.
            </p>
          </div>
        </div>
      </section>

      <section className="  max-w-6xl mx-auto  px-4 lg:px-2 py-12 space-y-16">
        {certificateData.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center min-h-[400px]"
          >
            <div
              className={`flex flex-col justify-center h-full lg:${
                index % 2 === 0 ? "md:order-1" : "md:order-2"
              }`}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-700 text-base  leading-relaxed text-justify">
                {item.description}
              </p>
            </div>

            <div
              className={`w-full min-h-[300px] md:min-h-[400px] relative ${
                index % 2 === 0 ? "md:order-2" : "md:order-1"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Certificate;