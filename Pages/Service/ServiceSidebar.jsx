import { useRef } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const ServiceSidebar = ({ services, activeService, onSelectService }) => {
  const detailsRef = useRef(null);

 if (!services || services.length === 0) return null;

  const handleMobileSelect = (serviceTitle) => {
    onSelectService(serviceTitle);
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  return (
    <aside className="w-full md:w-1/4 z-20">
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm sticky top-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-5 pb-2 border-b border-gray-200">
          Our Services
        </h2>

        <nav className="space-y-1 hidden md:block">
          {services.map((item) => (
            <button
              key={item.id}
              aria-current={activeService === item.title ? "page" : undefined}
              className={`flex justify-between items-center w-full text-left py-3 px-4 cursor-pointer text-base transition-all duration-200 rounded-lg ${
                activeService === item.title
                  ? "bg-yellow-50 text-yellow-800 font-medium border-l-4 border-yellow-500 shadow-sm"
                  : "text-gray-600 hover:bg-yellow-50 hover:text-yellow-700"
              }`}
              onClick={() => onSelectService(item.title)}
            >
              <span>{item.title}</span>
              {activeService === item.title ? (
                <IoIosArrowDown className="text-yellow-600" size={16} />
              ) : (
                <IoIosArrowForward className="text-gray-400" size={16} />
              )}
            </button>
          ))}
        </nav>

        <div className="md:hidden group">
          <details ref={detailsRef} className="relative">
            <summary className="list-none flex justify-between items-center p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 cursor-pointer focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
              <span>{activeService}</span>
              <IoIosArrowDown className="transition-transform duration-300 group-open:rotate-180" />
            </summary>

            <div className="absolute z-10 w-full mt-2 border border-gray-200 rounded-lg bg-white shadow-lg">
              <nav className="space-y-1 p-2">
                {services.map((item) => (
                  <button
                    key={item.id}
                    className={`flex justify-between items-center w-full text-left py-3 px-4 cursor-pointer text-base transition-all duration-200 rounded-lg ${
                      activeService === item.title
                        ? "bg-yellow-50 text-yellow-800 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => handleMobileSelect(item.title)}
                  >
                    <span>{item.title}</span>
                    {activeService === item.title && (
                      <span className="text-yellow-600">✔</span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </aside>
  );
};

export default ServiceSidebar;
