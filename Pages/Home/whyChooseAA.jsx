
const img_1 = "https://www.aasourcingltd.com/images/whowe/1-TrustedClients.png";
const img_2 = "/home-logo.jpg";
const img_3 = "https://www.aasourcingltd.com/images/whowe/3-YearsOfExperience.png";
const img_4 = "https://www.aasourcingltd.com/images/whowe/4-VisitedConference.png";
const img_5 = "https://www.aasourcingltd.com/images/whowe/5-ComplianceFactories.png";
const img_6 = "https://www.aasourcingltd.com/images/whowe/6-production.png";

const statsData = [
  {
    imageUrl: img_1,
    value: '30+',
    label: 'Trusted Clients',
  },
  {
    imageUrl: img_2,
    value: '3500',
    label: 'Shipments',
  },
  {
    imageUrl: img_3,
    value: '22+',
    label: 'Years of Experience',
  },
  {
    imageUrl: img_4,
    value: '55',
    label: 'Visited Conference',
  },
  {
    imageUrl: img_5,
    value: '17+',
    label: 'Compliance Factories',
  },
  {
    imageUrl: img_6,
    value: '1M',
    label: 'PCS/Month Production',
  },
];

const StatCard = ({ imageUrl, value, label }) => (
  <div className="flex flex-col items-center justify-center text-center bg-white border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 aspect-square">
    <div className="flex items-center justify-center h-16 w-16 mb-2">
      <img src={imageUrl} alt={label} className="h-full w-auto object-contain" />
    </div>
    <p className="text-3xl md:text-4xl font-bold text-slate-700">
      {value}
    </p>
    <p className="mt-1 text-xs font-semibold tracking-wider uppercase text-slate-500">
      {label}
    </p>
  </div>
);

const WhyChooseAA = () => {
  return (
    <section className="py-10 bg-slate-50 mb-10 sm:py-10 lg:py-10">
      <div className="px-4 mx-auto max-w-6xl lg:px-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
            <p className='text-sm font-bold mb-1'>Aaryan Sourcing </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
              Why Choose Aaryan Sourcing as Your Apparel Partner
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Aaryan Sourcing is modernising sourcing with a transparent, ethical, and quality supply chain of Bangladeshi fashion experts in Dhaka. We are a premium, quality-conscious brand specializing in ethical clothing, fair trade & eco-friendly fashion, targeting the sustainable industry worldwide in an ethical workplace.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Aaryan Sourcing is the Premier South Asian source for green apparel manufacturing, fair-trade clothing manufacturing, and sustainable textiles production. We bring sourcing to life by partnering with a group of dedicated individuals who care deeply about the world.
            </p>
          </div>

          {/* Right Column: Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
            {statsData.map((stat) => (
              <StatCard
                key={stat.label}
                imageUrl={stat.imageUrl}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAA;
