const Collections = () => {
  // Image URLs as variables
  const img_1 =
    "https://images.unsplash.com/photo-1633655442136-bbc120229009?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const img_2 =
    "https://plus.unsplash.com/premium_photo-1723780808432-357c758ade35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW5zJTIwJTIwZHJlc3MlMjBjb2xsZWN0aW9ufGVufDB8fDB8fHww";

  return (
    <div className="bg-white p-4 mb-10 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Collection */}
          <div
            className="relative bg-gray-200 h-[301px] p-12 flex flex-col justify-center items-start"
            style={{
              backgroundImage: `url(${img_1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <h2 className="relative text-4xl text-white">
              Resort <span className="font-bold">Mans</span>
            </h2>
            <h2 className="relative text-4xl text-white mt-1">Collections</h2>
            <button className="relative mt-6 bg-zinc-800 text-white text-sm font-medium py-2 px-6 hover:bg-zinc-700 transition-colors">
              Shop Now
            </button>
          </div>

          {/* Second Collection */}
          <div
            className="relative bg-gray-200 h-[301px] p-12 flex flex-col justify-center items-start"
            style={{
              backgroundImage: `url(${img_2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <h2 className="relative text-4xl text-white">
              New <span className="font-bold">Womans</span>
            </h2>
            <h2 className="relative text-4xl text-white mt-1">Collections</h2>
            <button className="relative mt-6 bg-zinc-800 text-white text-sm font-medium py-2 px-6 hover:bg-zinc-700 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
