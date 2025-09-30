const TagsSection = () => {
  const tags = [
    "accessories",
    "bag",
    "bodysuit",
    "caramel",
    "classic",
    "dress",
    "dry",
    "fabric",
    "fashion",
    "free",
    "hoodie",
    "jacket",
    "jeans",
    "shirt",
  ];

  return (
    <div className="bg-white  mt-4">
      <div className="mb-10">
        <h3 className="text-sm font-bold tracking-wide uppercase">Tags</h3>
        <div className="mt-2 mb-4 relative">
          <div className=" absolute top-0  w-full h-0.5 bg-gray-100"></div>
          <div className=" absolute top-0   w-12 h-0.5 bg-yellow-400 rounded"></div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="p-2 border border-gray-300 rounded-md text-gray-700 text-sm cursor-pointer hover:bg-gray-100 transition-colors duration-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagsSection;