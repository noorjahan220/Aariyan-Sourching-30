const BlogArchive = () => {
  const archives = [
    { month: "December 2018", count: 48 },
    { month: "November 2018", count: 25 },
    { month: "October 2018", count: 12 },
    { month: "September 2018", count: 14 },
    { month: "August 2018", count: 22 },
    { month: "July 2018", count: 38 },
    { month: "June 2018", count: 40 },
    { month: "May 2018", count: 22 },
  ];

  return (
    <aside className="bg-white w-full max-w-sm mt-10">
      <div>
        <h3 className="text-base font-semibold uppercase tracking-wider text-gray-800">
          Archives
        </h3>
        <div className="w-12 h-1 bg-amber-400 mt-2 mb-3"></div>

        <ul>
          {archives.map((archive, index) => (
            <li
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <a
                href="#"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
              >
                {archive.month} ({archive.count})
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default BlogArchive;