import CommonBanner from "../../components/CommonBanner";
import { BsCheckLg } from "react-icons/bs";

const employeesCovers = [
  "Bribery",
  "Disclosure of confidential documents",
  "Misappropriation of assets",
  "Falsification of records",
  "Sexual harassment",
  "Conflicting business interest activities",
  "Violation of the ZTV (zero tolerance violation) sourcing code",
];

const suppliersCovers = [
  "Child labor",
  "Disciplinary practices",
  "Legal Requirements",
  "Working hours",
  "Freedom of Association",
  "Unauthorized subcontracting",
  "Health, Safety",
];

const standardsList = [
  "Forced labor",
  "Harassment & Abuse",
  "Ethical standards",
  "Wages and benefits",
  "Discrimination",
  "Building and fire safety",
  "Environment",
];
const complianceIssues = [
  "Child labor",
  "Forced labor",
  "Discrimination",
  "Harassment and Abuse",
  "Unauthorized subcontracting including Tier 2 operations regardless of brands",
  "Shared buildings unless approved by the Head of Compliance (any factory owned by a different owner in the same building) or factories located in buildings that contain shops or markets",
  "Factory buildings approved for residential use",
  "Any unethical practice, such as bribery in cash or kind, to facilitate any process",
];
const infoBoxesData = [
  {
    title: "Approved Factory",
    description:
      "We will earnestly strive to meet all aspects of our buyers’ code of conduct. We will only collaborate with factories that our buyers have approved.",
  },
  {
    title: "Child labor",
    description:
      "Our code strictly prohibits the use of child labour. We will not partner with businesses that employ workers under the age of 15. Additionally, no worker shall be younger than the mandatory school-going age in the respective countries where they operate. If local laws set a higher minimum age than 15 years, then that stricter requirement will apply",
  },
  {
    title: "Forced labour",
    description:
      "We do not engage with any factory or organisation that uses forced or bonded labour",
  },
  {
    title: "Disciplinary practices",
    description:
      "We expect all our business partners to establish a straightforward disciplinary action procedure that complies with local laws. We do not engage with factories that have employees who use abusive language or practice corporal punishment, whether through mental or physical abuse, or any other form of coercion against workers.",
  },
  {
    title: "Harassment & Abuse",
    description:
      "We do not collaborate with any factory or organization that engages in harassment or abuse. Such actions are strictly prohibited as they contradict our buyer's Code of Conduct, our business ethics, and local laws.",
  },
  {
    title: "Legal requirements",
    description:
      "We expect all our business partners to adhere to local laws that govern their business conduct.",
  },
  {
    title: "Ethical standards",
    description:
      "We ensure we identify and work with organizations whose ethical standards align with ours.",
  },
  {
    title: "Working hours",
    description:
      "We prefer to collaborate with business partners who strive to respect the 60-hour weekly limit. Whenever the standard work hour limit is exceeded, we expect workers to be compensated in accordance with local law for any additional overtime hours. We allow flexibility in scheduling work hours; however, we will not engage with business partners who routinely make employees work over the 60-hour weekly limit. Additionally, workers should receive one day off for every seven days worked.",
  },
  {
    title: "Wages and Benefits",
    description:
      "We only partner with business associates who compensate heir workers in accordance with prevailing laws and provide all legally required benefits.",
  },
  {
    title: "Freedom of Association",
    description: `We honour workers' rights to join an association of
their choice and their right to collective bargaining. We only collaborate with
business partners who share this belief, and they must ensure that workers who
participate in such movements are not discriminated against. No punitive actions
should be taken against these workers for participating in any association or
movement, as long as they do not violate any local laws`,
  },
  {
    title: "Discrimination",
    description: `While recognising cultural, religious, and other differences, we
firmly believe that workers should be employed based on their skills alone.
Factors such as caste, creed, race, etc., shall not influence the process of
determining employability.`,
  },
  {
    title: "Unauthorised Subcontract",
    description: ` Unauthorised subcontracting is deemed a Zero
Tolerance Violation. No vendor may subcontract any aspect of our production
without prior notification and approval from our company. Any violation will
result in the delisting of such factories.`,
  },
  {
    title: "Building and fire safety",
    description: `We firmly expect all our business partners to ensure
building and fire safety in accordance with local law and the buyer’s
requirements.`,
  },
  {
    title: "Health & Safety",
    description:
      "We exclusively engage with factories that provide their workers with a safe and healthy work environment.",
  },
  {
    title: "Environment",
    description: ` We expect all our business partners to ensure that their work
processes do not adversely affect the environment in any way. Our business
partners are required to meet all legal requirements related to environmental
aspects and strive to consistently exceed mere compliance with the law
consistently.`,
  },
];
const Compliance = () => {
  const img_banner = "/complianceBanner.jpg";
  const img1 = "/complianceImage1.jpg";
  const complianceImage = "/img3.jpg";
  const noChildLaborImage = "/child.jpg";
  const fireDrillImage = "/fireprotection.jpg";

  return (
    <div>
      <CommonBanner
        backgroundImage={img_banner}
        breadcrumb="Compliance & Ethics"
      />
      <div className="max-w-6xl mx-auto px-4 lg:px-2">
        <section className="bg-white py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <img
                src={img1}
                alt="Sewing machine in action"
                className="w-full h-auto object-cover"
              />
              <p className="mt-6 text-base text-gray-600 leading-relaxed">
                We Do Obey All Legal & Social Compliances Guided by Laws and
                Regulatory Bodies as Per Local Government Order & Global
                Requirements. Some of Our Major Compliance Issues Are:
              </p>
            </div>
            <div className="lg:col-span-2 bg-gray-50 ">
              <div className="bg-yellow-500 text-white text-center text-xl font-bold py-4 ">
                Compliance & Ethics
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="bg-white rounded-md cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-yellow-500 transition-all duration-200">
                    <a
                      href="#compliance-vision"
                      className="p-4 flex items-center w-full"
                    >
                      <div className="flex-shrink-0 bg-yellow-500 rounded-full w-7 h-7 flex items-center justify-center mr-4">
                        <BsCheckLg className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">Compliance Vision</span>
                    </a>
                  </li>

                  <li className="bg-white rounded-md cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-yellow-500 transition-all duration-200">
                    <a
                      href="#zero-tolerance-policy"
                      className="p-4 flex items-center w-full"
                    >
                      <div className="flex-shrink-0 bg-yellow-500 rounded-full w-7 h-7 flex items-center justify-center mr-4">
                        <BsCheckLg className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">
                        Zero Tolerance Policy
                      </span>
                    </a>
                  </li>

                  <li className="bg-white rounded-md cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-yellow-500 transition-all duration-200">
                    <a
                      href="#code-of-conduct"
                      className="p-4 flex items-center w-full"
                    >
                      <div className="flex-shrink-0 bg-yellow-500 rounded-full w-7 h-7 flex items-center justify-center mr-4">
                        <BsCheckLg className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">Code Of Conduct</span>
                    </a>
                  </li>

                  <li className="bg-white rounded-md cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-yellow-500 transition-all duration-200">
                    <a href="#csr" className="p-4 flex items-center w-full">
                      <div className="flex-shrink-0 bg-yellow-500 rounded-full w-7 h-7 flex items-center justify-center mr-4">
                        <BsCheckLg className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">CSR</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="compliance-vision" className="bg-gray-50 py-12 lg:py-16">
          <div className="bg-yellow-500 text-gray-800 text-center text-2xl font-bold py-4 ">
            Compliance Vision
          </div>
          <div className="bg-white p-6 md:p-10 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              <div className="flex flex-col gap-6">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Social Compliance
                </h2>
                <div className="bg-gray-50  p-4 ">
                  <p className="text-gray-600 leading-relaxed">
                    To uphold the reputation of our customers, business
                    partners, and our organization by ensuring that ethics,
                    integrity, and technical expertise are uncompromisingly
                    practiced in our audit processes.
                  </p>
                </div>
                <div className="bg-gray-50  p-4 ">
                  <p className="text-gray-600 leading-relaxed">
                    To enlist a factory, our compliance team first visits the
                    factory for a social compliance audit. If the audit is
                    successful, we then proceed with placing the order. In this
                    regard, we adhere to the buyer's Code of Conduct and local
                    laws.
                  </p>
                </div>
                <div className="bg-gray-50 p-4 ">
                  <p className="text-gray-600 leading-relaxed">
                    We regularly monitor compliance issues among all our
                    enlisted suppliers and vendors, both announced and
                    unannounced.
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={complianceImage}
                  alt="Compliance meeting with workers"
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 border border-gray-200 p-6 ">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Employees' COC covers
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  {employeesCovers.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-6 \">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Suppliers' COC Covers
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  {suppliersCovers.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-6 ">
                <ol className="list-decimal list-inside space-y-2 text-gray-600 pt-11">
                  {standardsList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="zero-tolerance-policy" className="bg-white py-12 lg:py-16">
          <div className="bg-yellow-500 text-white text-center text-2xl font-bold py-4">
            Zero Tolerance Policy
          </div>
          <div className="bg-gray-100 p-6 md:p-10 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Compliance Issues To Be Categorized As ZTV
                </h2>
                <div className="bg-white ">
                  <ul className="divide-y divide-gray-200">
                    {complianceIssues.map((issue, index) => (
                      <li
                        key={index}
                        className="p-4 text-gray-600 leading-relaxed"
                      >
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <img
                src={noChildLaborImage}
                alt="No Child Labor awareness"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section id="code-of-conduct" className="bg-white py-12 lg:py-16">
          <div className="bg-yellow-500 text-white text-center text-2xl font-bold py-4 ">
            Code Of Conduct
          </div>
          <div className="bg-gray-50 p-6 md:p-10">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
              AA Sourcing Ltd Code Of Conduct For Manufacturing Unit
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our code is derived from the values and standards established by
              our customers, particularly the Declaration of Human Rights, many
              of the ILO core conventions, and local laws. We are earnestly
              committed to fulfilling all aspects of our buyers’ code of
              conduct. We only collaborate with factories that our buyers have
              approved
            </p>
            <div className="mb-8">
              <img
                src={fireDrillImage}
                alt="Workers participating in a fire safety drill"
                className="w-full h-auto object-cover "
              />
            </div>
            <div className="space-y-6">
              {infoBoxesData.map((box, index) => (
                <div key={index} className="bg-white lg:p-6 p-4 ">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {box.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {box.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="csr" className="bg-white py-12 lg:py-16">
          <div className="bg-yellow-500 text-white text-center text-2xl font-bold py-4">
            CSR
          </div>
          <div className="bg-gray-50 p-6 md:p-10 ">
            <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-2">
              CSR (Corporate Social Responsibility)
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
              <p>
                Aaryan Sourcing collaborates exclusively with factories that
                take their social responsibility seriously and implement
                effective measures to improve the community and the environment
                surrounding them. This not only enhances our ethical standards
                but also enables our clients to feel that their partnership with
                us generates a greater good beyond just financial transactions.
              </p>
              <p>
                It is part of our code to ensure that our business partners are
                aware of the well-being of their workers and the environmental
                impact. Our compliance factories feature in-house daycare
                centres, emergency first-aid professionals, and various social
                amenities to promote workers' peace of mind. They are also
                well-equipped with waste disposal equipment and methods to
                minimise adverse effects on the environment.
              </p>
              <p>
                Additionally, we are proud to have developed and supported
                exceptional charitable initiatives across Bangladesh, with
                Aaryan Sourcing. I have been participating in all of them from
                the beginning. These initiatives include providing proper
                education for underprivileged and orphaned children, as well as
                funding rural clinics.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <div className="bg-white p-6 ">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Ensuring Education for Kids:
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Aaryan Sourcing believes that being in harmony with the
                    world comes with the responsibility to make it a better
                    place. Our mission is to provide underprivileged and
                    orphaned children with a quality education that equips them
                    with the skills necessary to support themselves and their
                    families in the future, thus breaking the vicious cycle of
                    poverty.
                  </p>
                </div>
                <div className="bg-white p-6 ">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Funds for Clinic:
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We are allocating a portion of our funds to clinics located
                    in rural areas. We donate to these clinics to provide free
                    medical care to low-income individuals. These health clinics
                    offer free consultations, treatment, and homeopathic
                    medicines to the neediest people in these rural regions.
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={complianceImage}
                  alt="Corporate Social Responsibility event"
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Compliance;
