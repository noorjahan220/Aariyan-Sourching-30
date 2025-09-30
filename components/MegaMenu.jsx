import Link from "next/link";
import Image from "next/image";
export default function MegaMenu({ content }) {
  return (
    <div
      className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-screen max-w-3xl
               bg-slate-50 rounded-lg shadow-lg border border-gray-200
               opacity-0 invisible group-hover:opacity-100 group-hover:visible
               transform translate-y-4 group-hover:translate-y-0
               transition-all duration-300 ease-in-out"
    >
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">
            {content.collectionLinks.title}
          </h3>
          <ul className="space-y-3">
            {content.collectionLinks.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-yellow-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-4">
            {content.productLineLinks.title}
          </h3>
          <ul className="space-y-3">
            {content.productLineLinks.links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-yellow-600 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {content.imageLinks.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="group/image block relative rounded-lg overflow-hidden"
            >
              <Image
                src={item.src}
                alt={item.alt}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover/image:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-lg tracking-wider font-medium">
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
