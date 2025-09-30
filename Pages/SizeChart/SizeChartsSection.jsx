import Image from "next/image";
import CommonBanner from "../../components/CommonBanner";

const imgBanner = "/SizeChart-image/Global-Sizing-Fit.jpg";
const img_1 = "/SizeChart-image/Accurate-Fit.jpg";
const img_2 = "/SizeChart-image/Custom-Size-Chart.jpg";
const img_3 = "/SizeChart-image/Parfect-Fit.jpg";
const img_4 = "/SizeChart-image/How-to-measure.jpg";
const img_5 = "/SizeChart-image/Men-Woman-Size.jpg";
const img_6 = "/SizeChart-image/Custom-Bulk.jpg";
const img_7 = "/SizeChart-image/Common-Issue.jpg";

const SizeChartsSection = () => {
  const sizeChartsData = [
    {
      heading: "Apparel Size Guide",
      description: `Aaryan Sourcing understands that if your clothing doesn’t fit properly, you’re unlikely to wear it. This
Apparel Size Guide will help you find the perfect size for personalised apparel. Our sizing chart provides
specific measurements across all styles and sizes, and we recommend using these measurements to achieve
the ideal fit. Our guide includes men’s, women’s, and unisex sizes to ensure the perfect fit. It offers chest,
waist, hip, and inseam measurements to assist you in ordering the correct size. Our bespoke clothing size
options mean each item is tailored for an ideal fit. Our fit guide removes the guesswork associated with ill-
fitting apparel, so your customised attire can be another way to feel fantastic. Leave your custom-made
clothes to Aaryan Sourcing.`,
      image: {
        src: img_1,
        alt: "A fashion designer measuring a dress on a mannequin.",
      },
    },
    {
      heading: "Custom Size Chart for Apparel",
      description: `Aaryan Sourcing provides a comprehensive reference for garment sizes, helping you measure and achieve
the best fit for your custom apparel. You can be sure to get the right fit using our size chart, which has exact
measurements for men's, women's, and children's items. The quickest method to find out what size you need
and how to measure for it is to use the Apparel Size Chart. When you order a personalized T-shirt, hoodie,
jacket, or activewear, you can be sure that our sizing guide will provide you with a perfect fit. For large
purchases or people with different body types, we can make custom sizes. Rockiness ensures client happiness
by making sure our clothes fit perfectly for each customer's size. This item was produced by hand and is one
of a kind. Aaryan Sourcing has a size chart on this page that shows you how to find the right size for your
clothes`,
      image: {
        src: img_2,
        alt: "Men's shirt size measurement.",
      },
    },
    {
      heading: "Find Your Perfect Fit with Aaryan Sourcing.",
      description: `Aaryan Sourcing's handmade garments are made to fit perfectly. The simple Size Chart will help you discover
the right fit every time. Our Custom Sizing Chart enables you to find the perfect fit for your body type,
whether you're ordering multiple items or just one for yourself. The included Size Chart makes it even easier
for men, women, or unisex items to get the appropriate fit. All you have to do is measure your waist, hips,
chest, and inseam. Our unique Size Chart can help you get the right fit, whether you're ordering regular or
bespoke sizes for a special project. Aaryan Sourcing wants to help you discover the right fit for all of your
custom clothing needs. Please check the size guide to make sure you get the best fit. Try your own and Cosy
shirts on today to get the best fit every time.`,
      image: {
        src: img_3,
        alt: "Woman taking dress measurements.",
      },
    },
    {
      heading: "How to Measure for Apparel Sizes",
      description: `Proper measurements allow everyone to look and feel their best in custom-made clothes. Introducing Aaryan
Sourcing's Apparel Size Guide- You no longer need to order the next size up! First things first: get adequately
measured for your body, including your chest, waist, hips, and inseam. The Fashion Brands Size Chart
describes how to take body measurements properly. For the most accurate testing, use light-weight clothing
or a naked body (recommended size). Then refer to our Size Recommendations to get the correct
measurement of the shorts you’d like to purchase. That way, every garment fits and feels as if it were made
just for you. Clothes for Women: Consult our size chart based on your particular body type, apparel, or
fashion company when purchasing an individual item or a set of the same item.`,
      image: {
        src: img_4,
        alt: "Kids fashion size reference.",
      },
    },
    {
      heading: "Size Chart for Men’s and Women’s Apparel",
      description: `Online sizing charts for men's and women's clothing are available at Aaryan Sourcing. Our accurate and
straightforward size chart is made to help you choose the correct size every time. Our men’s size chart caters
to all standard sizes, and our women’s clothes have various charts so you can find your perfect fit, no matter
what size you are! Whether you order a t-shirt, hoodie, or other item, it’s going to be SOLID. In addition,
you can select the size reference in the size chart to make a good choice. The size chart includes suggestions
with every baby milestone, and you can use the height and weight recommendations for a worry-free, long-
running dress that is sized just right. Aaryan Sourcing prides itself on providing each custom garment a
perfect fit, a comfortable feel, and a modish look.`,
      image: {
        src: img_5,
        alt: "Footwear size measurement.",
      },
    },
    {
      heading: "Custom Sizing for Bulk Orders",
      description: `A private label option is available for bulk orders, offering six different color options and a custom size loose
fit. Tips on Sizing (if applicable) Whether looking to dress your job site, crew, or coordinating an event from
the office, our sizing information will help you get the right fit for each recipient. We provide a full-size
range to fit all body types. We understand that orders aren’t always standard, which is why a one-size-fits-
all approach doesn’t work for everyone when you’re asking for large orders—not one SKU—at a time. This
means they can all be adjusted individually to suit, ensuring a perfect fit for both comfort and style.
Consulting our garment sizing guide gives you peace of mind, knowing every piece that comes into your
store matches the sizes your clients wear. For workwear, team wear, or promotional wear, every order is
made to measure and tailored to fit.`,
      image: {
        src: img_6,
        alt: "Jacket and coat size fitting.",
      },
    },
    {
      heading: "Common Sizing Issues & Solutions",
      description: `Common Sizing Issues & Solutions
We get that fitting can be a problem when buying custom clothes. To help guarantee you are in the correct size, please
refer to our sizing guides to prevent fitting issues. One of the most common mistakes is buying the wrong size, simply
because you provided us with incorrect measurements. To avoid this problem, merely refer to our official size chart
for guidance on making the best choice for your body, considering your chest, waist, hips, and inseam measurements.
Another common problem is ordering clothes that are too big or too small. To ensure a proper fit, please check the
size information provided before ordering. This will help you select the correct size chart for your clothes, taking into
account the detailed style of the shirts. If you determine fit is not the correct size even after consulting with our staff,
consider bumping up to custom singlets for a more tailored fit. Aaryan Sourcing takes care of all your size problems
and makes sure you get a perfect fit.`,
      image: {
        src: img_7,
        alt: "Sportswear measurement chart.",
      },
    },
  ];

  return (
    <div className="bg-slate-50">
      <CommonBanner backgroundImage={imgBanner} breadcrumb={"Size Chart"} />

      <div className="max-w-6xl mx-auto pb-16 px-4 lg:px-2 sm:pb-20">
        <section className="sm:p-12 mb-16">
          <div className="max-w-6xl mx-auto text-center text-gray-600 text-lg space-y-6">
            <p>
              Aaryan Sourcing feels that perfect fitting is elegance and
              comfort. We developed our Apparel Size Guide to help brands,
              retailers, and purchasers source clothing with confidence. We also
              know (from our worldwide customer base) that different markets
              require different sizes, and so precision is key for happy
              customers and reduced returns. Our Apparel Size guide is portioned
              for tops, bottoms, outerwear, and accessories for men, women, and
              children. We provide you with the exact sleeve length, shoulder
              measurement, chest measurement, and other relevant details. For
              easy international purchases, we have included US, UK, EU, and
              Asian sizing conversions below.
            </p>
            <p>
              Aaryan Sourcing establishes sourcing garments to meet criteria
              with industry knowledge and extensive quality checking
              obligations. Our Apparel Size Guide eliminates the guesswork when
              it comes to finding the perfect fit on casual wear, formal attire,
              and sportswear. We help partners reduce size discrepancies,
              establish customer confidence, and enhance brand loyalty. Aaryan
              Sourcing is not just a vendor; we are your precision and quality
              partner for all your global garment sourcing.
            </p>
          </div>
        </section>

        <div className="space-y-16">
          {sizeChartsData.map((item, index) => (
            <div
              key={index}
              className={`
                bg-white rounded-2xl shadow-lg overflow-hidden
                flex flex-col md:flex-row items-stretch
                transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
                ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}
              `}
            >
              <div className="w-full md:w-5/12 flex-shrink-0">
                <div className="relative w-full h-64 md:h-full">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="w-full md:w-7/12 flex flex-col justify-center p-8 sm:p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {item.heading}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SizeChartsSection;