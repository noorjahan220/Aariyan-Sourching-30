const parseCmykString = (str) => {
  const parts = str
    .trim()
    .split(".")
    .map((p) => parseFloat(p));
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) {
    throw new Error(`Invalid CMYK string: ${str}`);
  }
  const clamp = (n) => Math.max(0, Math.min(100, n));
  const [c, m, y, k] = parts.map(clamp);
  return { c, m, y, k };
};

const cmykToRgb = (c, m, y, k) => {
  const C = c / 100,
    M = m / 100,
    Y = y / 100,
    K = k / 100;
  const r = Math.round(255 * (1 - C) * (1 - K));
  const g = Math.round(255 * (1 - M) * (1 - K));
  const b = Math.round(255 * (1 - Y) * (1 - K));
  return { r, g, b };
};

const rgbToHex = (r, g, b) =>
  `#${[r, g, b]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;

const cmykStringToHex = (cmykStr) => {
  const { c, m, y, k } = parseCmykString(cmykStr);
  const { r, g, b } = cmykToRgb(c, m, y, k);
  return rgbToHex(r, g, b);
};

const COLORS = [
  { name: "BLUE", CMYK: "100.100.0.0" },
  { name: "BROWN", CMYK: "0.75.75.35" },
  { name: "CELTIC", CMYK: "100.0.71.62" },
  { name: "CINN ORANGE", CMYK: "0.66.88.0" },
  { name: "DALLAS SILVER", CMYK: "6.0.2.46" },
  { name: "DENVER ORANGE", CMYK: "0.59.96.0" },
  { name: "DENVER NAVY", CMYK: "100.68.0.54" },
  { name: "DARK BLUE", CMYK: "100.68.0.54" },
  { name: "DARK NAVY", CMYK: "100.100.0.80" },
  { name: "DARK ORANGE", CMYK: "0.50.100.20" },
  { name: "DARK PURPLE", CMYK: "0.77.11.47" },
  { name: "DET LIONS BLUE", CMYK: "90.57.0.0" },
  { name: "GREEN BAY GREEN", CMYK: "76.0.64.62" },
  { name: "INDY ROYAL", CMYK: "100.73.0.2" },
  { name: "JACKSON TEAL", CMYK: "100.0.12.43" },
  { name: "KC RED", CMYK: "0.29.91.0" },
  { name: "KELLY GREEN", CMYK: "70.0.100.0" },
  { name: "KHAKI", CMYK: "0.0.40.38" },
  { name: "MICHIGAN BLUE", CMYK: "100.87.35.28" },
  { name: "MID NAVY", CMYK: "100.100.0.50" },
  { name: "MIDNIGHT", CMYK: "100.100.0.80" },
  { name: "NAVY BLUE", CMYK: "100.100.0.60" },
  { name: "NAVY", CMYK: "100.100.0.70" },
  { name: "NE BLUE", CMYK: "100.64.00.60" },
  { name: "ORANGE", CMYK: "0.50.100.0" },
  { name: "PARROT GREEN", CMYK: "80.80.0.0" },
  { name: "PINK", CMYK: "0.25.20.0" },
  { name: "PURPLE", CMYK: "98.100.0.43" },
  { name: "RED APPLE", CMYK: "0.88.94.38" },
  { name: "ROYAL BLUE", CMYK: "100.69.0.9" },
  { name: "SKY BLUE", CMYK: "100.25.0.0" },
  { name: "TITANIUM", CMYK: "0.4.7.29" },
  { name: "WHITE", CMYK: "0.0.0.0" },
  { name: "YELLOW", CMYK: "0.0.100.0" },
  { name: "ATLANTA BLACK", CMYK: "100.35.0.100" },
  { name: "ATLANTA RED", CMYK: "0.100.81.4" },
  { name: "BABY BLUE", CMYK: "43.3.1.0" },
  { name: "BAKER CHOCOLATE", CMYK: "0.47.75.64" },
  { name: "BEST BLACK", CMYK: "75.67.68.90" },
];

const ColorCard = ({ item }) => {
  const hex = cmykStringToHex(item.CMYK);

  return (
    <div className="rounded-2xl   bg-white p-5 shadow-lg  flex flex-col gap-1 items-center transition hover:-translate-y-0.5 hover:shadow-md mb-10">
      <div
        className="mx-auto mb-4 h-20 w-20 rounded-full ring-2 ring-gray-100 shadow"
        style={{ backgroundColor: hex }}
        aria-label={`${item.name} swatch`}
        title={`${item.name} • ${item.CMYK}`}
      />
      <p className="text-center text-xs font-semibold tracking-wide text-gray-800 uppercase">
        {item.name}{" "}
      </p>
      <p className="font-normal normal-case text-gray-500">{item.CMYK}</p>
    </div>
  );
};

export default function ExclusiveColours() {
  return (
    <main className="sm:px-10 md:px-16 py-6 lg:px-0">
      <section className="mx-auto max-w-6xl">
        <div className="title text-center mt-8 mb-4">
          <h1 className="mb-8 text-2xl font-semibold text-gray-900 uppercase">
            Buyer's Exclusive Color Collection
          </h1>

          <p className="text-[#777777]">
            Premium colors curated from our latest collaborations
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {COLORS.map((c) => (
            <ColorCard key={`${c.name}-${c.CMYK}`} item={c} />
          ))}
        </div>
      </section>
    </main>
  );
}
