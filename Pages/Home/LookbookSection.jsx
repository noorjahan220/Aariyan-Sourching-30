import LookBooksectionsBtn from "../../components/allbuttons/LookBooksectionsBtn";
const PlusIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 0V12M0 6H12" stroke="white" strokeWidth="1.5" />
  </svg>
);
const Hotspot = ({ position }) => (
  <button
    className={`absolute ${position} w-5 h-5 bg-black rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2`}
  >
    <PlusIcon />
  </button>
);

const LookbookSection = () => {
  const currentYear = new Date().getFullYear();
  const img_lookbook =
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1887&auto=format&fit=crop";
  const img_product1 = "https://picsum.photos/seed/product1/400/400";
  const img_product2 = "https://picsum.photos/seed/product2/400/400";
  const img_product3 = "https://picsum.photos/seed/product3/400/400";
  const img_product4 = "https://picsum.photos/seed/product4/400/400";
  const img_product5 = "https://picsum.photos/seed/product5/400/400";
  const img_product6 = "https://picsum.photos/seed/product6/400/400";

  const products = [
    { id: 1, name: "Women floral dress", price: 150, image: img_product1 },
    { id: 2, name: "Women floral dress", price: 129, image: img_product2 },
    { id: 3, name: "Sleek summer top", price: 99, image: img_product3 },
    { id: 4, name: "Classic denim jeans", price: 180, image: img_product4 },
    { id: 5, name: "Evening cocktail dress", price: 250, image: img_product5 },
    { id: 6, name: "Leather ankle boots", price: 220, image: img_product6 },
  ];
  return (
    <section className="relative bg-white py-10 lg:py-10 px-4">
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#FFF7E8] z-0"></div>
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="bg-gray-200 aspect-[4/5]">
              <img
                src={img_lookbook}
                alt="Lookbook model"
                className="w-full h-full object-cover"
              />
            </div>
            <Hotspot position="top-[10%] left-[60%]" />
            <Hotspot position="top-[20%] left-[80%]" />
            <Hotspot position="top-[45%] left-[30%]" />
            <Hotspot position="top-[50%] left-[75%]" />
            <Hotspot position="top-[70%] left-[55%]" />
            <Hotspot position="top-[90%] left-[45%]" />
          </div>

          <div>
          
            <h2 className="text-4xl font-light text-gray-800">
              {`Lookbook ${currentYear}`}
            </h2>
            <div className="w-10 h-0.5 bg-gray-800 my-4"></div>
            <p className="text-gray-500 leading-relaxed max-w-md">
             
              {`Discover the Aaryan Sourcing Lookbook ${currentYear}, showcasing the latest
              trends in wholesale sourcing and supply chain solutions. It
              features premium products and innovative sourcing strategies
              perfect for retailers and e-commerce businesses. Stay ahead of the
              curve with our ${currentYear} collection.`}
            </p>
            <LookBooksectionsBtn products={products} />
            <div className="mt-8">
              <button className="bg-gray-800 text-white px-8 py-3 hover:bg-gray-700 transition-colors">
                View All Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookbookSection;
