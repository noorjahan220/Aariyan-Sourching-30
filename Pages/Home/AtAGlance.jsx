const skills = [
  { name: "R&D And Product Development", percentage: "100%" },
  { name: "On Time Delivery", percentage: "100%" },
  { name: "Fast Response & Sample Submission", percentage: "100%" },
  { name: "Quality Standard 2.5 AQL", percentage: "100%" },
];

const ProgressBar = ({ name, percentage }) => (
  <div>
    <div className="flex justify-between items-center mb-1.5">
      <p className="text-sm font-medium text-gray-700">{name}</p>
      <p className="text-sm font-bold text-yellow-500">{percentage}</p>
    </div>
    <div className="w-full bg-gray-200/90 rounded-full h-2">
      <div
        className="bg-yellow-400 h-2 rounded-full"
        style={{ width: percentage }}
      ></div>
    </div>
  </div>
);

const AtAGlance = () => {
  return (
    <section className="bg-white py-5 sm:py-5 mb-10">
      <div className="max-w-6xl mx-auto px-4 lg:px-2 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-extrabold tracking-wider uppercase text-gray-800">
              AT A GLANCE
            </h2>
            <p className="mt-6 text-gray-600 leading-relaxed">
              Linking worldwide wholesalers with reliable garment manufacturers
              throughout Asia, Aaryan Sourcing. Provides professional wholesale
              apparel sourcing services. We guarantee quality, efficiency, and
              dependability at every stage of your supply chain.
            </p>
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-5 lg:pl-8 lg:border-l lg:border-gray-200">
            <div className="space-y-8">
              {skills.map((skill) => (
                <ProgressBar
                  key={skill.name}
                  name={skill.name}
                  percentage={skill.percentage}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:col-span-3 lg:pl-8 lg:border-l lg:border-gray-200 flex items-center justify-center h-full">
            <div className="bg-slate-50 p-8 rounded-lg text-center w-full max-w-xs mx-auto">
              <p className="text-5xl font-bold text-yellow-500">30+</p>
              <p className="mt-2 text-base font-medium text-gray-800">
                Happy Customer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtAGlance;
