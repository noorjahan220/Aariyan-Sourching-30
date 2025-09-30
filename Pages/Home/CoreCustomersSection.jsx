const img_1 = "https://i.ibb.co/BHSFx7Vz/blob.png";
const img_2 = "https://i.ibb.co/kVJwZ5hn/blob.png";
const img_3 = "https://i.ibb.co/wZCNyRDX/blob.png";
const img_4 = "https://i.ibb.co/gZvr7tnG/blob.png";
const img_5 = "https://i.ibb.co/RGdGH7YS/blob.png";
const img_6 = "https://i.ibb.co/8nsMKYgh/blob.png";
const img_7 = "https://i.ibb.co/k2YG80mr/blob.jpg";
const img_8 = "https://i.ibb.co/YBYj21ck/blob.png";
const img_9 = "https://i.ibb.co/5hvhrs11/blob.png";
const img_10 = "https://i.ibb.co/nsH7yGJg/blob.jpg";
const img_11 = "https://i.ibb.co/wFXKcX1v/blob.png";

const logos = [
  { name: "Kappa", src: img_1 },
  { name: "Kik", src: img_2 },
  { name: "Lidl", src: img_3 },
  { name: "LPP", src: img_4 },
  { name: "Pepco", src: img_5 },
  { name: "Silbon", src: img_6 },
  { name: "Valtrade", src: img_7 },
  { name: "Krolys", src: img_8 },
  { name: "Cropp", src: img_9 },
  { name: "Reserved", src: img_10 },
  { name: "Sinsay", src: img_11 },
];

const CoreCustomersSection = () => {
  return (
    <>
      <style>
        {`
          @keyframes infinite-scroll {
              from { transform: translateX(0); }
              to { transform: translateX(-100%); }
          }
          .animate-infinite-scroll {
              animation: infinite-scroll 50s linear infinite;
          }
        `}
      </style>
      <div className="bg-white py-5">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-gray-800 mb-10 text-3xl font-bold">
            Our Core Customers
          </h2>
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll hover:[animation-play-state:paused]">
              {logos.map((logo, index) => (
                <li key={index}>
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-14 object-contain"
                  />
                </li>
              ))}
            </ul>
            <ul
              className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll hover:[animation-play-state:paused]"
              aria-hidden="true"
            >
              {logos.map((logo, index) => (
                <li key={index}>
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-14 object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoreCustomersSection;
