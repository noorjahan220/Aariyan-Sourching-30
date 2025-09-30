import { FaHome } from "react-icons/fa";

const CommonBanner = ({ title, breadcrumb, backgroundImage }) => {
  return (
    <div
      className={`banner w-full h-[150px]  flex flex-col justify-center items-center ${
        backgroundImage ? "bg-black/50" : "bg-black"
      }`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundBlendMode: backgroundImage ? "multiply" : "normal",
      }}
    >
      <div className="text-center">
        <h1 className="text-[38px] font-semibold text-white capitalize">
          {title}
        </h1>
        <p className="text-[14px] text-white capitalize flex items-center gap-2 justify-center">
          <FaHome /> home / <span className="primary_text">{breadcrumb}</span>
        </p>
      </div>
    </div>
  );
};

export default CommonBanner;
