import Image from "next/image";
import { FaCheck } from "react-icons/fa";

const EXCLUDED_KEYS = [
  "id",
  "title",
  "subtitle",
  "description",
  "image",
  "notes",
];

const ServiceContent = ({ service }) => {
  if (!service) {
    return (
      <div className="w-full md:w-3/4">
        <p>Please select a service.</p>
      </div>
    );
  }

  const listSections = Object.entries(service).filter(
    ([key, value]) => Array.isArray(value) && !EXCLUDED_KEYS.includes(key)
  );

  return (
    <main className="w-full md:w-3/4">
      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border border-gray-100">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-700 mb-2">
            {service.title}
          </h1>
          {service.subtitle && (
            <p className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
              {service.subtitle}
            </p>
          )}
          <div className="relative w-full aspect-video overflow-hidden rounded-lg">
            <Image
              src={service.image}
              alt={service.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 800px"
              priority={true}
            />
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-600 font-medium">
            {service.description}
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8">
          {listSections.map(([key, value]) => (
            <div key={key}>
              <h2 className="text-xl font-semibold text-yellow-700 mb-4">
                {key}
              </h2>
              <ul className="space-y-2 list-none p-0">
                {value.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <FaCheck className="text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {service.notes && (
            <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-400">
              <p className="text-gray-700 italic m-0">{service.notes}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ServiceContent;
