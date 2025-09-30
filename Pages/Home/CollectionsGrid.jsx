import { GiCutDiamond } from "react-icons/gi";

const img_1 =
  "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0";
const img_2 =
  "https://images.unsplash.com/photo-1561334112-5cc34885f22f?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0";
const img_3 =
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0";
const img_4 =
  "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0";
const img_5 =
  "https://images.unsplash.com/photo-1703355685913-0113173df436?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0";
const img_6 =
  "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0";

const collectionsData = [
  {
    title: "Woman Accessories",
    gridClasses: "lg:col-start-1 lg:row-start-1",
    labelPosition: "left",
    imageUrl: img_1,
  },
  {
    title: "Winter Collection",
    gridClasses: "lg:col-start-1 lg:row-start-2",
    labelPosition: "left",
    imageUrl: img_2,
  },
  {
    title: "Woman Store",
    gridClasses: "md:row-span-2 lg:col-start-2 lg:row-start-1 lg:row-span-2",
    labelPosition: "left",
    imageUrl: img_3,
  },
  {
    title: "Special Discount",
    gridClasses: "lg:col-start-3 lg:row-start-1",
    labelPosition: "left",
    imageUrl: img_4,
  },
  {
    title: "Man Accessories",
    gridClasses: "lg:col-start-4 lg:row-start-1",
    labelPosition: "left",
    imageUrl: img_5,
  },
  {
    title: "Man's Store",
    gridClasses: "md:col-span-2 lg:col-start-3 lg:col-span-2 lg:row-start-2",
    labelPosition: "right",
    imageUrl: img_6,
  },
];

const CollectionsGrid = () => {
  const cardBaseStyles =
    "relative bg-gray-200 bg-cover bg-center h-80 md:h-auto";
  const labelBaseStyles =
    "absolute bottom-0 bg-zinc-800 text-white px-5 py-2 text-sm font-medium";

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-4 mb-5">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Our Premium Apparel Categories
        </h2>
        <div className="flex justify-center items-center my-6 space-x-4">
          <div className="w-16 h-px bg-gray-300"></div>
          {/* ✅ React-Icons Diamond */}
          <GiCutDiamond className="text-gray-700 w-6 h-6" />
          <div className="w-16 h-px bg-gray-300"></div>
        </div>
        <div className="text-center w-full max-w-lg mx-auto">
          <p className="text-gray-500">
            Discover premium apparel categories at Aaryan Sourcing—Men’s
            Clothing, Women’s Clothing, Children's Clothing, Workwear, Headwear,
            and Home Textiles.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="mx-auto max-w-6xl pt-8 lg:pt-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-7 lg:h-[70vh] lg:min-h-[500px] lg:max-h-[700px]">
          {collectionsData.map((collection) => (
            <div
              key={collection.title}
              className={`${cardBaseStyles} ${collection.gridClasses}`}
              style={{ backgroundImage: `url(${collection.imageUrl})` }}
            >
              <div
                className={`${labelBaseStyles} ${
                  collection.labelPosition === "left" ? "left-0" : "right-0"
                }`}
              >
                {collection.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsGrid;
