"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import CommonBanner from "../../components/CommonBanner";

// --- Service Component ---
const Service = () => {
  const companyData = [
    {
      id: 1,
      title: "Research and Development",
      subtitle: "In-house Technical and R&D Teams",
      description:
        "Aaryan Sourcing emphasizes research and development as the core of our business. As an innovative and sustainable company, we have integrated R&D infrastructure and built a team to drive the discovery of new processes, product development, and improvements to our current production infrastructure.",
      "The aim of the R&D division": [
        "Optimise processes and products",
        "Enhance efficiency sustainably",
        "Reduce the use of natural resources",
        "Innovate sustainable products and processes",
      ],
      details:
        "The effective research and development lead us to advance sustainability in manufacturing apparel products. The research and development activities aim to manufacture products using effective, sustainable methods that are environmentally friendly, enhance product lifespan, and increase the efficiency of various processes. The integrated R&D supports a future that goes beyond the objectives of AA Sourcing Ltd and our partners.",
      notes:
        "Research means 'to do again,' while ‘search' refers to 'to look for.' Development encompasses growth, progress, and positive change in the ready-made garment (RMG) industry, focusing on novelty, presenting new styles, and improving garment designs.",
      image:
        "https://i.ibb.co/93dK1yfB/Fashion-Research-and-Development-Design-and-Fabric-Selection-Aaryan-Sourcing.jpg",
    },

    {
      id: 2,
      title: "Sample Development",
      subtitle: "Dynamic and Experienced Team",
      description:
        "Aaryan Sourcing always prioritizes all kinds of samples based on customer requirements. Sampling is crucial in the apparel industry because buyers typically place orders after evaluating the quality of the samples. It is a key element of the pre-production process. The method of developing a sample varies according to the buyer’s requirements and the style or type of garment involved.",
      "Aaryan Souring provides garment samples in various types as per customer requirements":
        [
          "Development Sample",
          "Prototype Sample",
          "Fit Sample",
          "Size Set Sample",
          "Strike-Off Sample",
          "Counter Sample",
          "Ad or Photo Shoot Sample",
          "Sales/Marketing/Showroom Sample",
          "Garment Performance Test (GPT) Sample",
          "Pre-Production (PP) Sample",
          "Wash Sample",
          "Top of Production (TOP) Sample",
          "Shipment Sample",
        ],
      "The primary objectives of the sampling process are listed below": [
        "Enable the buyer to assess production capabilities",
        "Offer a way to revise bulk production process",
        "Help estimate thread and fabric consumption and cost quotations",
        "Inform the buyer about the potential of an exporter",
      ],
      image:
        "https://i.ibb.co/0yQ1qstJ/Sample-Development-in-Fashion-Design-Fabric-Cutting-and-Measurement-Aaryan-Sourcing.jpg",
    },

    {
      id: 3,
      title: "Merchandising",
      subtitle: "Dedicated merchandising team",
      description:
        "Aaryan Sourcing’s primary focus is client satisfaction, and one of our key strengths lies in merchandising through our vibrant, experienced, and committed team of merchandisers. Our dedicated merchandiser consistently proactively communicate with all parties and maintain ongoing follow-up on every order. We support and track order status using OPS (Order Progress Schedule), ensuring timely submissions to keep deliveries within the specified lead time. Our team works closely with the QA and QC teams to provide precise sample submissions and organized bulk production. We meticulously examine each submission to ensure that the buyer's requirements are fully understood and completely satisfied.",
      image:
        "https://i.ibb.co/SwwpG8pw/Fashion-Merchandising-and-Garment-Design-Process-Aaryan-Sourcing.jpg",
    },
    {
      id: 4,
      title: "Fabric Sourcing",
      subtitle: "Fabric sourcing team for local and imported fabrics",
      description:
        "To guarantee the highest quality for our products, we partner with knitting and woven factories that are equipped with state-of-the-art machinery and premium accessories, including needles, sinkers, yarn feeders, and more.to produce seamless and uninterrupted rolls of fabric, all supervised by experienced operators. For fabrics that need to be sourced externally, we form partnerships with only the top suppliers in the market. Types of Woven Fabrics: We prioritize customer needs and produce a wide range of garments tailored to those specifications.",
      "Plain weave fabrics": [
        "Plain weave",
        "Twill",
        "Satin",
        "Chambray",
        "Chiffon",
        "Corduroy",
        "Crepe",
        "Dobby",
        "Embossed",
        "Flannel",
        "Gabardine",
        "Georgette",
        "Herringbone",
        "Khadi",
        "Mélange",
        "Mesh",
        "Oxford",
        "Poplin",
        "AOP",
        "Sheeting",
        "Silk",
        "Taffeta",
        "Tissue",
        "Velour",
        "Velvet",
      ],
      "Types of Denim Fabrics: We are addressing customer requirements and producing various kinds of denim garments":
        [
          "100% cotton denim",
          "Raw denim",
          "Washed denim",
          "Stretch denim",
          "Bull denim",
          "Colored denim",
          "Acid-wash denim",
          "Chambray fabrics",
        ],
      "Types of Knitted Fabrics: We tailor our production to meet customer requirements, offering a diverse range of denim garments":
        [
          "Single jersey",
          "Double jersey",
          "Interlock",
          "Slub",
          "Burnout",
          "Mélange",
          "Fleece",
          "French terry",
          "Design terry",
          "Micro/baby terry",
          "Piqué",
          "Lacoste",
          "Rib",
          "Sequin fabrics",
        ],
      notes:
        "Different types of sweater fabrics cater to customer requirements and produce various kinds of denim garments. We use a variety of imported, blended, dyed, and local yarns, including acrylic, sandy angora, tape yarn, grey mélange, cashmere, cotton, nylon, viscose, wool, merino wool, Eco Vero, polyester chenille, lamb wool, alpaca, and more. In sweater fabrics, we can produce 1.5, 2, 3, 5, 7, 10, 12, and 14-gauge (GG) fabrics",
      image:
        "https://i.ibb.co/vxTKNSWG/Colorful-Fabric-Collection-for-Sourcing-and-Design-Aaryan-Sourcing.jpg",
    },
    {
      id: 5,
      title: "Knitting",
      subtitle: "Advanced knitting methods",
      description:
        "Our knitting factories are equipped with the latest machines, including both tube and open diameters in almost all important and widely used gauges. Our circular knit machine diameters range from 20 inches to 68 inches, capable of running all usable yarn counts. We use only the best needles, sinkers, and other accessories in our machines. Our machines can operate at high RPMs to deliver faster production rates. For perfect quality assurance, our facilities are equipped with digital infrared check tables that can detect imperfections often overlooked by common human errors. The locally sourced yarns used in our production are of the finest grade, and if the client requires, we also work with custom-bonded yarns imported on their behalf",
      "Types of Our Knitting Machines:": [
        "Weft knitting machine",
        "Single jersey circular knitting machine",
        "Double jersey circular knitting machine",
        "Single-needle straight bar knitting machine",
        "Double-needle straight bar knitting machine",
        "Flatbed or v-bed flat knitting machine",
        "Rib electronics Jacquard machine",
        "Semi-Jacquard collar",
        "Rib electronics Jacquard",
        "Fleece machine",
        "6-colour auto striper machine",
      ],
      image:
        "https://i.ibb.co/jYTH8Tn/Industrial-Knitting-Machines-for-Textile-Production-Aaryan-Sourcing.jpg",
    },
    {
      id: 6,
      title: "Garments Production",
      subtitle: "Experienced and Dedicated Production Team",
      description:
        "Experienced and Dedicated Production Team. Aaryan Sourcing has over 35 factories dedicated to producing various RMG products, all of which comply with industry standards. We have multiple, distinct factories for our knit, woven, denim, and sweater productions, which minimizes the risk of order overlap. To ensure maximum efficiency, these factories employ only skilled workers and consistently prioritize worker welfare. As AA Sourcing Ltd champions women's empowerment, we proudly report that nearly 70% of all workers across our factories are women.",
      machines: [
        "Rib electronics Jacquard machine",
        "Fleece machine",
        "6-colour auto striper machine",
      ],
      production_process: [
        "First, the PP sample is approved by the buyer.",
        "Patterns are finalized.",
        "The entire production process is planned out.",
        "The desired fabric is manufactured or sourced.",
        "The fabric is dyed, washed, and other chemical treatments are performed according to the order instructions.",
        "Accessories and trims are manufactured or sourced based on the client’s requirements.",
        "The fabric is cut to the measurements of the finalized patterns.",
        "The printing process is executed.",
        "Garment sewing and the addition of accessories are completed.",
        "The final products are checked and packed per the buyer’s requirements.",
        "The consignment is shipped to the buyer’s designated port by either ship or air.",
      ],
      quality_check: [
        "An order is considered active only after the buyer approves the PP sample.",
        "Our professionals inspect the quality of the yarns used.",
        "The knitting and weaving process is monitored, and each roll of fabric is individually checked using digital infrared check tables.",
        "After dyeing and washing procedures, the fabric rolls are examined again for defects.",
        "Accessories are verified both manually and automatically by our quality control team after production.",
        "QCs conduct a quality check after pattern cutting.",
        "In-line quality control is performed.",
        "A pre-final inspection is conducted.",
        "Only after the pre-final inspection is conducted are the goods ready for the final inspection.",
        "After the final inspection is completed, we only allow the shipment to proceed if we are certain that all of the client’s requirements have been met.",
      ],
      notes:
        "International compliance codes and national regulations are strictly upheld throughout the entire process of manufacturing our RMG products. Since our clients' satisfaction is a priority, we leave no stone unturned regarding quality and ensure that our market presence is eco-friendly.",
      image:
        "https://i.ibb.co/Q33sKNGy/Textile-Production-Line-Sewing-Machines-in-Action-Aaryan-Sourcing.jpg",
    },
    {
      id: 7,
      title: "Quality Assurance and Quality Control",
      subtitle: "A seasoned quality assurance team",
      description:
        "Aaryan Sourcing has a skilled and well-qualified team of QA and QC. They are involved in every stage of production at all production units around the clock, immediately after the pre-cutting approval is granted. The QCs stationed at our factories consistently monitor the production process and conduct size, set, inline, midline, pre-final, and final inspections, ensuring that everything meets the required standards. All inspection reports are examined and signed off by the Quality and Merchant team. Final inspection can only be performed if the results of the pre-final inspection are satisfactory. Once we obtain all quality approvals from the client and conduct the final inspection, the goods are ready for shipment.",
      image:
        "https://i.ibb.co/ymn4Qn4q/Quality-Assurance-and-Quality-Control-in-Apparel-Manufacturing-Aaryan-Sourcing.jpg",
    },
    {
      id: 8,
      title: "Embroidery",
      subtitle: "Advanced embroidery techniques",
      description:
        "We offer our clients a wide range of computer embroidery services, guaranteeing precision down to the last stitch. Our facilities feature cutting-edge digital embroidery machinery from leading brands, operated by skilled engineers to deliver the high-quality results that we consistently promise our clients.",
      "List of embroidery services provided according to the requirements of our existing clients.":
        [
          "General embroidery",
          "Appliqué embroidery",
          "Sequin embroidery",
          "Lurex embroidery",
        ],
      image:
        "https://i.ibb.co/1YDj167d/Embroidery-Process-Machine-Stitching-on-Apparel-Aaryan-Sourcing.jpg",
    },
    {
      id: 9,
      title: "Garment Dyeing and Wash",
      subtitle: "All forms of dyeing and washing",
      description:
        "To ensure the best quality and execute fast delivery, we are working with compliant dyeing and washing plants located close to our factory, including in-house washing facilities. All of these dyeing and washing plants are environmentally friendly and possess international certifications such as DETOX, BEPI, BSCI, GOTS, etc. Local regulations are strictly maintained, and each plant is equipped with its own water treatment system for wastewater, minimizing environmental effects, notably water pollution. All of our dyeing and washing plants can perform all kinds of regular and advanced washes according to client requirements on all types of apparel (Knit, Woven, Denim, and Sweater.",
      "Here’s a list of the types of washing processes according to our current customer requirements:":
        [
          "Normal Wash",
          "Pigment Wash",
          "Bleach Wash",
          "Stone Wash",
          "Acid Wash",
          "Enzyme Wash",
          "Sand Blasting",
          "Super White Wash",
        ],
      "Here’s a list of all types of dyeing processes based on our current client requirements:":
        [
          "Disperse dye",
          "Reactive dye",
          "Direct dye",
          "Vat dye",
          "Acid dye",
          "Substantive dye",
          "Sulfur dye",
          "Natural dye",
          "Beam dyeing",
          "Indigo dyeing",
          "Batik dyeing",
          "Skein dyeing",
          "Tie-dye",
          "Warp beam dyeing",
        ],
      image:
        "https://i.ibb.co/35Tb5q4H/Garment-Dyeing-and-Wash-Process-in-Textile-Factory-Aaryan-Sourcing.jpg",
    },
    {
      id: 10,
      title: "Printing",
      subtitle: "All kinds of printing",
      description:
        "Our printing facilities can handle bulk production of all types of RMG printing. Our factories include both a manual printing section and a digital printing section. We also have a dedicated design department to implement any design.",
      "Types of printing available to our clients:": [
        "Pigment/Water print",
        "Semi-rubber print",
        "Rubber print",
        "Crack print",
        "Flock print",
        "Reflective print",
        "Puff print",
        "Glitter print",
        "HD print",
        "3D print",
        "Foil print",
        "Sublimation print",
        "Process/Photo print",
        "Discharge print",
        "Gel print",
        "Beats print",
        "Sugar print",
        "Embossed print",
      ],
      image:
        "https://i.ibb.co/MkHTYVRj/Screen-Printing-Process-in-Textile-Industry-Aaryan-Sourcing.jpg",
    },
    {
      id: 11,
      title: "Trimming and Accessories",
      subtitle: "Trimming and Accessories Production and Sourcing Team",
      description:
        "All our accessories and trims are produced in our accessory manufacturing factory. Our facility is equipped with the latest machinery from top brands, ensuring no compromise in production quality while bulk production is carried out with ease. Our engineers and operators are highly experienced and knowledgeable in this sector, so all client requirements are met accurately. We also have a dedicated accessories sourcing team that specializes in obtaining unique imported trims and accessories upon client request. AA Sourcing Ltd consistently ensures the best product quality and support.",
      "List of all Trims and Accessories produced by Aaryan Sourcing :": [
        "Sewing Thread",
        "Button",
        "Zipper",
        "Lining",
        "Interlining",
        "Snap Button",
        "Hasps and Slider",
        "Embroidery",
        "Applique",
        "Beads",
        "Glitter",
        "Rhinestones",
        "Sequins",
        "Drawstring",
        "Waist ties",
        "Bows",
        "Fringe",
        "Pom Pom",
        "Tassel",
        "Labels",
        "Patch",
        "Hook and Loop",
        "Eyelet/Grommet",
        "Hook and Eye",
        "Padding",
        "Elastic",
        "Lace fabric",
        "Twill tape",
        "Rib",
        "Belt",
        "Hanger",
        "Safety pin",
        "Scotch tape",
        "Polybag",
        "Carton",
      ],
      notes:
        "Since the apparel industry is highly sensitive, various chemical tests are conducted on all items before approval according to the customer’s requirements.",
      "Tests conducted on samples:": [
        "Azo Test",
        "Carcinogenic Dyes Test",
        "Heavy Metals Test",
        "Formaldehyde Test",
        "Phenols Test",
        "pH Test",
        "Pesticides Test",
      ],
      image:
        "https://i.ibb.co/pq8DcNH/Trimmings-and-Accessories-for-Fashion-Design-and-Apparel-Aaryan-Sourcing.jpg",
    },
    {
      id: 12,
      title: "On-Time Delivery & Logistics",
      description:
        "Proper packing and on-time delivery of goods are essential for both manufacturers and importers of apparel brands. An accurate packing method and safe arrival help avoid damage to goods and maintain their appearance through ironing. In the delivery and shipment section, our commercial and shipment team works diligently to expedite the entire process and ensure smooth delivery. We operate on FOB terms and ensure that goods are delivered to the forwarder nominated by the customer. Additionally, our shipping department assists all clients in selecting the best shipment and forwarding company based on their requirements for fast delivery",
      image:
        "https://i.ibb.co/WvnQkkH6/Multimodal-Delivery-and-Shipment-Aaryan-Sourcing.jpg",
    },
  ];

  const companyInfoMap = new Map(companyData.map((item) => [item.title, item]));

  // state
  const [activeSection, setActiveSection] = useState(companyData[0].title);
  const currentContent = useMemo(
    () => companyInfoMap.get(activeSection),
    [activeSection]
  );

  // UI
  return (
    <div>
      <CommonBanner backgroundImage={"/service.jpg"} breadcrumb={"Service"} />

      {/* Intro Section */}
      <section className="bg-white py-16 sm:py-20 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-2 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Apparel Services
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Aaryan Sourcing supplies apparel from concept to completion and is
            equipped to handle your garment manufacturing and delivery needs...
          </p>

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/workprocess"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 font-semibold text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 transition-colors duration-300"
            >
              <span>Learn more about our sourcing process</span>
              <FaArrowRight />
            </Link>
            <Link
              href="/Sustainability"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              <span>Explore our sustainability practices</span>
              <FaArrowRight />
            </Link>
            <Link
              href="/profile"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              <span>View our company profile</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <div className="max-w-6xl mx-auto text-gray-800">
        <div className="mx-auto px-4 lg:px-2 py-12 md:py-16 flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-1/3 space-y-3">
            {companyData.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveSection(service.title)}
                className={`block w-full text-left p-3 rounded-md transition ${
                  activeSection === service.title
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {service.title}
              </button>
            ))}
          </aside>

          {/* Content */}
          <main className="w-full md:w-2/3 bg-white rounded-lg shadow-md p-6">
            {currentContent ? (
              <div>
                <h2 className="text-2xl font-semibold mb-3">
                  {currentContent.title}
                </h2>
                {currentContent.subtitle && (
                  <p className="text-gray-600 mb-3">
                    {currentContent.subtitle}
                  </p>
                )}
                <p className="mb-4">{currentContent.description}</p>
                {currentContent.image && (
                  <img
                    src={currentContent.image}
                    alt={currentContent.title}
                    className="rounded-lg mb-4"
                  />
                )}
                {/* Render array fields dynamically */}
                {Object.entries(currentContent).map(([key, value]) => {
                  if (Array.isArray(value)) {
                    return (
                      <div key={key} className="mb-4">
                        <h3 className="font-medium mb-2">{key}</h3>
                        <ul className="list-disc pl-6 space-y-1">
                          {value.map((v, i) => (
                            <li key={i}>{v}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p>No content available</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Service;
