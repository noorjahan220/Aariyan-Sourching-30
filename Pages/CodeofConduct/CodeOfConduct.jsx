import CommonBanner from "../../components/CommonBanner";

const CodeOfConduct = () => {

  const img_banner = "/image.png";
  const img_1 = "/Code-Of-Conduct.jpg";
  const img_2 = "/Ethical-Practice.jpg";
  const img_3 = "/Corporate.jpg";
  const img_4 = "/Core-Values.jpg";
  const img_5 = "/Bussiness-Ethics.jpg";
  const img_6 = "/Manufaturing.jpg";
  const img_7 = "/Fair-Labor.jpg";
  const img_8 = "/Green-Practices.jpg";

  const codeofconductdata = [
    {
      id: 1,
      title: "Aaryan Sourcing Global Code of Conduct",
      image: img_1,
      description: `The aaryan sourcing global code of conduct is central to our business and embodies our culture. this comprehensive framework forms the basis of our honesty, openness and compliance with global rules, testifying to our corporate integrity in all matters. the most ethical, fair and integrity in all what we do, winning the trust from all the stake holders and partners! more than just a set of principles, our global code of conduct serves as a pledge to continued integrity within our business operations.`,
    },
    {
      id: 2,
      title: "Commitment to Ethical Practices",
      image: img_2,
      description: `Our company is Aaryan Sourcing. We care about ethical business practices, social impact, and the sustainability of our industry. Waste reduction, energy efficiency, and eco-responsible products are top of mind throughout our product lifecycle. Responsible business includes corporate responsibility to our employees, to the consumers we serve, to the communities in which we operate, as well as to the environment. Fair labor practices preserve the rights of workers to safe and fair working conditions, equal opportunity, and fair wages. And from these ideas we deliver better goods that are in line with our Goodness criteria, and a more inclusive and sustainable future.`,
    },
    {
      id: 3,
      title: "Sustainability and Corporate Responsibility",
      image: img_3,
      description: `Aaryan Sourcing. We believe in sourcing, sustainability, and corporate responsibility with our Global Code of Conduct. We strive to minimize our environmental footprint by using sustainably sourced materials and low-waste techniques. Our approach is consistent with today’s needs and preserves resources for our children and grandchildren. We're proud to be responsible in business and beyond profit, ethical at every level. We work for fair work, human rights, and an accountable supply chain with high ethical standards. And it helps us build great relationships with our partners, employees, and customers, and to make the world a better place.`,
    },
    {
      id: 4,
      title: "Our Core Values and Principles",
      image: img_4,
      description: `Aaryan Sourcing's focus revolves around compliance, sustainability, and fair work. Through complying with international rules and regulations, we ensure that we are providing only safe environments for our ultimate end users – that is what we have been doing and will continue to do, and the what we are known for. Our business policies focus on environmentally friendly procurement, waste reduction, and energy saving to minimize the impact on the environment. All of our supply chain employees receive safe, respectful working conditions and fair wages. In so adhering to our neuroses, we design a responsible and equitable business model that scales and generates value for our communities and planet.`,
    },
    {
      id: 5,
      title: "Business Ethics and Compliance",
      image: img_5,
      description: `Our operations are based on sourcing, ethics and compliance, Aaryan explained. We abide by all applicable international and local laws ensuring transparency, accountability and integrity in all transactions. Our responsibility as a business is to safeguard the health and well-being of our staff, customers and community. In every aspect of our business, we take steps to be environmentally-friendly, minimizing our carbon footprint and saving resources. We work to build trusting, respectful work relationships and to enrich, by adhering to these values, society and the earth.`,
    },
    {
      id: 6,
      title: "Sustainability in Apparel Manufacturing",
      image: img_6,
      description: `Aaryan Sourcing is a socially responsible garment manufacturer focusing on sustainability, compliance and corporate responsibility. We reuse, recycle, and save on both waste and energy. By complying with international rules, we guarantee that our production methods meet the most demanding ethical and environmental standards. Our sustainability is not only compliance but also good for the environment and the community. Being the leading provider of industry not only with high-quality fabric for sustainable clothing, which can help in having a sustainable future for everyone but also can work transparently & responsibly is a reflection of our environmental responsibility and corporate responsibility philosophy.`,
    },
    {
      id: 7,
      title: "Fair Labor Practices and Human Rights",
      image: img_7,
      description: `Aaryan Sourcing ensures that each of our suppliers treats their workers fairly and respects their human rights. We guarantee that everybody is treated with respect, has a safe place to work, is being paid fairly, and has equal opportunity. We follow labor laws so that all mankind has a fair and equal workplace, enabling us to combat exploitation and discrimination. We also conduct audits and checks as part of our fair work practices to check compliance with the regulations. Our goal is to establish a work environment with a sense of identity, a commitment to integrity, and a culture of fairness, respect, and dignity for all employees to succeed in an engaging and dynamic place to work while understanding that our employees’ success is integral to our success and overall stewardship.`,
    },
    {
      id: 8,
      title: "Environmental Responsibility",
      image: img_8,
      description: `We are wholly dedicated to the cause of green and sustainable working here at Aaryan Sourcing! We reduce carbon emissions, preserve resources and minimize waste throughout our supply chain. Our manufacturing processes contribute in creating a healthy planet with renewable raw materials and green energy. We adhere to International environmental laws and pursue sustainable options as a directive. We are here to make our industry, and the world, a better place by supporting good environmental practices. We are morally bound as guardians of the earth to ensure we do this not only as an act of sustainability and corporation responsibility, but as close to creating a business with as clean a footprint as possible.`,
    },
  ];

  return (
    <div>
      <CommonBanner backgroundImage={img_banner} breadcrumb="code of conduct" />
      <section>
        <div className="max-w-6xl mx-auto px-4 lg:px-2 my-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            Code of Conduct
          </h2>
          <p className="pt-10 text-gray-700">
            The Aaryan Sourcing Code of Conduct of International also promotes
            honesty and accountability. Responsible and ethical conduct defines
            our work and our common future in a globalised world. It also
            represents our commitment to ethical business practices. This norm
            is led by leadership, integrity, dialogue, and human rights. We
            recognize that all of our actions have an impact on the environment,
            and we strive to minimize that impact. In everything we do, we’re
            thinking about materials, production, and end-of-life sustainability
            in everything that we make. We purchase sustainably, reduce waste,
            and work to be energy-efficient and environmentally responsible. We
            utilize state-of-the-art and environmentally friendly technology in
            our goods construction, guided by the principles of quality and
            ecology. Aaryan Sourcing is committed to fair and safe labor
            practices, fair compensation, and the rights of workers in our
            supply chain. We respect international labour standards and work
            towards a respectful and courteous work environment. We think high
            ethical work standards are indispensable to the success of the
            network. So, our focus is on our corporate responsibility, not our
            pocketbook. The health and care of our workers, consumers, and the
            planet are integral to our success. Our Global Code of Conduct
            obliges us to do the right thing and gives us the confidence to
            continue to treasure and create a more equitable, open world. It is
            our firm belief at Aaryan Sourcing that doing business with honesty,
            fairness, and sustainability takes care of society as well as the
            environment.
          </p>
        </div>
        <section className="w-full max-w-6xl mx-auto px-4 lg:px-2 py-12 space-y-16">
          {codeofconductdata.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center min-h-[400px]"
            >
              {/* Text Content */}
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

              {/* Image */}
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
      </section>
    </div>
  );
};

export default CodeOfConduct;
