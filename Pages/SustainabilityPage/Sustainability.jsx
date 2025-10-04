import Image from "next/image";
import CommonBanner from "../../components/CommonBanner";

const Sustainability = () => {
  const imgSocial1 = "/sustainability-image/banner.jpg";
  const imgSocial2 = "/sustainability-image/Commitment.jpg";
  const imgSocial3 = "/sustainability-image/ecofriendly.jpg";
  const imgSocial4 = "/sustainability-image/ethicalfair.jpg";
  const imgSocial5 = "/sustainability-image/reducingimpact.jpg";
  const imgEnv1 = "/sustainability-image/materials.jpg";
  const imgEnv2 = "/sustainability-image/green.jpg";
  const imgTech1 = "/sustainability-image/socialfair.jpg";

  const socialComplianceData = [
    {
      id: 1,
      title: "Sustainability at Aaryan Sourcing",
      image: imgSocial1,
      alt: "GSV Logo",
      text: "Aaryan Sourcing. We prioritise sustainability and ethical sourcing. We are a mission-driven team focused on revolutionising the fashion industry. It does not harm the environment, making this product eco-friendly. Our fabric is also easy to keep looking new with a cold-water wash and low tumble dry. We conduct a rigorous multiple selection process to identify Sustainability Apparel manufacturers that uphold high environmental and ethical standards, passing these benefits on to you. Sustainable clothing should prioritise the care of our world for future generations. We also work with suppliers who share our values for transparency, fairness, and doing the right thing so that we can ensure our products are sourced responsibly. Feel good while wearing them, sourced from Aaryan Sourcing – your friendly home of beautiful, ethical Apparel Manufacturing producers that make a difference, providing you with environmentally friendly fabrics and green apparel manufacturing options. Join us in our journey toward a more sustainable world, one piece of clothing at a time.",
    },
    {
      id: 2,
      title: "Our Commitment to Sustainable Apparel",
      image: imgSocial2,
      alt: "SMETA Sedex Logo",
      text: "With our eco-friendly clothing, we are disrupting the status quo in fashion and fighting for a world that’s good to everyone. Sustainable clothing production is easier on the environment, limits waste, and uses less energy to produce. Our signature is written on the design of each piece, which is a testament to our commitment to sustainability, with meticulous selection of fabrics and avant-garde technology. Our earth- friendly clothing factory maintains the strictest ethical and quality standards while keeping the environment and community in mind. At Aaryan Sourcing, we are confident that we are the world’s best green garment manufacturer. We can also do our part by adopting ethical clothing choices. Eco-fashion can also teach us how to effect substantive change.",
    },
    {
      id: 3,
      title: "Eco-Friendly Manufacturing Practices",
      image: imgSocial3,
      alt: "WRAP Logo",
      text: "Aaryan Sourcing passionately believes in the sustainability of garment manufacturing. We are a fashion brand with a low environmental footprint. We are working closely with trusted vendors that share our commitment to the environment, and every step in creating a garment is done in line with the values we believe in. Using cutting-edge technology and environmentally conscious clothing production, we can eliminate waste and use less water (two of our most basic resources!), and energy-efficient machinery helps reduce our impact on the environment. Our earth-friendly garments are made with environmentally responsible manufacturing processes to comply with all our sustainability and social responsibility goals. Aaryan Sourcing leads the way in green fashion. We aim to provide sustainable fashion without sacrificing style, proving that the two can live harmoniously.",
    },
    {
      id: 4,
      title: "Ethical Sourcing and Fair Trade",
      image: imgSocial4,
      alt: "Amfori BSCI Logo",
      text: "At Aaryan Sourcing, we're very committed to fairtrade and ethical sourcing. We create eco and community- minded fashion for the road, using responsible, sustainable materials that make a world of difference. We buy sustainably and work with other retailers who share our values of fairness, transparency, and respect for workers. With fair trade, we ensure that all our products are eco-friendly and that everyone in the production chain receives fair wages and safe working conditions for each wooden piece. Our sustainable baby and infant clothing collection is respectful and light on the planet - meaning essential organic newborns' babywear has never cost so little. For people and planet, Aaryan Sourcing is an exceptional option. Provides trendy and sustainable clothing you can feel good about.",
    },
    {
      id: 5,
      title: "Reducing Environmental Impact in Apparel Production",
      image: imgSocial5,
      alt: "ICS Logo",
      text: "So, the sustainability strategy of Aaryan Sourcing is absolutely underpinned by fair trade and ethical garment sourcing. ABOUT THE SHOP We produce eco-friendly products inspired by nature and the community, synergizing sustainable clothing perfect for both work and play. We care about where clothing comes from and strive to build a community of vendors who value justice, transparency, and fair treatment for employees as we do. Fair-trade We're fully committed to fair trade standards, working conditions, and the finest quality products, which is why we've just become officially certified Fair Trade. That means our factories meet rigorous factory certification requirements, and our products are produced ethically, too. Our green practices serve as an example to our employees, suppliers, and customers, demonstrating that we can all contribute to a healthier planet. This enables you to provide a cleaner, brighter future for your baby with our environmentally friendly newborn items. Aaryan Sourcing is a company that considers the people and the Earth. It has fantastic, eco-friendly clothing that you’ll feel comfortable wearing all day.",
    },
  ];

  const environmentComplianceData = [
    {
      id: 1,
      title: "Sustainable Materials and Fabrics.",
      image: imgEnv1,
      alt: "ZDHC Logo",
      text: "Aaryan Sourcing is environmentally friendly, using eco-friendly materials and fabrics to help protect the environment. Eco materials. We are constantly doing our best to build the most sustainable products that use less material, produce less waste, and consume less energy. We take great care to source all of our materials ethically and sustainably, including organic cotton and recycled polyester. Our environmentally-friendly clothing production eliminates the release of harmful toxins and slowly degrades into the environment, thereby minimising our overall carbon footprint. Our production process is low carbon, our garments are delightful for the planet, and look smashing on you. We focus on sustainable materials to design a fashionable, eco-friendly garment. It is indeed a stylish as well as beneficial approach to Aaryan Sourcing.",
    },
    {
      id: 2,
      title: "Green Manufacturing & Waste Reduction",
      image: imgEnv2,
      alt: "Higg Index Logo",
      text: "At Aaryan Sourcing, we are dedicated to creating sustainable clothing and a greener footprint! The one-of- a-kind is made with the environment in mind and constructed out of sustainable materials. We have a lower waste, low energy use, and low carbon process for manufacturing high-quality apparel products. We pay our workers fairly, treat them humanely, and maintain safe working conditions. It is on this principle that we have formed the opinion that sustainability is not just about being environmentally responsible and that it clearly includes workers’ rights. We bring you good looks, well-made clothing at a great price, and we do it responsibly by not being wasteful and using environmentally responsible fabrics. Aaryan Sourcing is leading the way for sustainable fashion production, proving that fashion can be a vehicle in which we support both our environment and the world's workforce.",
    },
  ];

  const technicalComplianceData = [
    {
      id: 1,
      title: "Social Responsibility and Fair Labour Practices",
      image: imgTech1,
      alt: "OCS Logo",
      text: "Aaryan Sourcing, sustainability in clothing means social responsibility, fair wages, and safe working conditions, as well as eco-friendly fabrics and responsible garment manufacturing. We maintain a strict Code of Conduct for all participants in our sustainable garment production projects. We work with like-minded suppliers who also offer fair pay, safe working conditions, competitive benefits, and workers' rights. We maintain an emphasis on realistic production costs while continuing our commitment to responsible, fair wages for every item we produce—a sustainable garment. We make sustainable clothing because fashion should never come at the cost of those who make it or the world. we call home. We are mindful of the eco-friendly materials we choose, and our social responsibility by adopting conscientious business practices to preserve the environment without compromising employee integrity. Aaryan Sourcing. Proudly provides gorgeous & sustainable clothing to help make a more ethical and fair fashion industry globally",
    },
  ];

  return (
    <div className="bg-slate-50">
      <CommonBanner
        backgroundImage={imgSocial1}
        breadcrumb={"Sustainability"}
      />

      <section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 lg:px-2">
    <div className="text-center mx-auto max-w-3xl mb-16">
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight mb-4">
        Our Sustainability Pillars
      </h2>
      <p className="text-gray-600 leading-relaxed">
        Aaryan Sourcing was founded on the principle of sustainability. We advocate for handmade, socially conscious, and environmentally sound design. We carefully select raw materials and ensure they are produced in an environmentally friendly manner, establishing a
        responsible base for everything we create.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
     
      <div className="group p-6 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md hover:border-blue-100">
        <div className="flex items-start">
          <div className="inline-flex items-center justify-center w-12 h-12 mr-4 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors duration-300 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Mindful Manufacturing
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Aaryan Sourcing was founded on the principle of sustainability. We
        advocate for handmade, socially conscious, and environmentally
        sound design. We carefully select raw materials and ensure they
        are produced in an environmentally friendly manner, establishing a
        responsible base for everything we create.
            </p>
          </div>
        </div>
      </div>
      
    
      <div className="group p-6 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md hover:border-green-100">
        <div className="flex items-start">
          <div className="inline-flex items-center justify-center w-12 h-12 mr-4 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-100 transition-colors duration-300 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ethical Sourcing & Fair Labor
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
               Aaryan Sourcing values ethical suppliers. Our international
          partners and allies share our commitment to justice, openness,
          and social responsibility. You can rely on our ethical fabric
          production, which ensures that workers are safe, paid fairly,
          and not exploited. Our brand is ethical fashion for all, a
          reality we have accomplished through our promise of fairness.
            </p>
          </div>
        </div>
      </div>
      
   
      <div className="group p-6 border border-gray-200 rounded-lg transition-all duration-300 hover:shadow-md hover:border-purple-100">
        <div className="flex items-start">
          <div className="inline-flex items-center justify-center w-12 h-12 mr-4 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100 transition-colors duration-300 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Our Sustainable Vision
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              For us, sustainability is an ongoing journey. We continually
              innovate to make our value chain more sustainable, concentrating
              on product development, environmental care, and human care.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight">
              Social Compliance
            </h2>
            <div className="mt-4 w-24 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          <div className="space-y-16">
            {socialComplianceData.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white shadow-md border border-gray-200 overflow-hidden flex flex-col lg:flex-row items-center ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full lg:w-1/2 relative aspect-video">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-full lg:w-1/2 p-8 md:p-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight">
              Environmental Compliance
            </h2>
            <div className="mt-4 w-24 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          <div className="space-y-16">
            {environmentComplianceData.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white shadow-md border border-gray-200 overflow-hidden flex flex-col lg:flex-row items-center ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full lg:w-1/2 relative aspect-video">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-full lg:w-1/2 p-8 md:p-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl tracking-tight">
              Technical Compliance
            </h2>
            <div className="mt-4 w-24 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          <div className="space-y-16">
            {technicalComplianceData.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white shadow-md border border-gray-200 overflow-hidden flex flex-col lg:flex-row items-center ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="w-full lg:w-1/2 relative aspect-video">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-full lg:w-1/2 p-8 md:p-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;