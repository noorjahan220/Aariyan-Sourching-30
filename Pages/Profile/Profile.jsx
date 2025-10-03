import Image from "next/image";
import CommonBanner from "../../components/CommonBanner";

export default function Profile() {
  return (
    <div className="bg-white">
      <section className="relative text-white">
        <CommonBanner
          backgroundImage={"/Company-Profile.jpg"}
          breadcrumb={"Profile"}
        ></CommonBanner>
      </section>

      {/* --- Our Profile Section (Corrected) --- */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Profile</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
          </div>

          {/* --- THIS IS THE NEWLY ADDED PART --- */}
          {/* <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-800">AARYAN SOURCING.</h3>
            <p className="text-md text-gray-500 mt-2">
              Your Reliable International Sourcing Associates
            </p>
          </div> */}
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-video">
              <Image
                src={"/profile.jpg"}
                alt="Our Workshop"
                fill
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">AARYAN SOURCING</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                AARYAN SOURCING was established in 2020, having a strong connection with our sister concern, EXPO DRESS MARKETING, which is a well-known garment house since 2000. With over two decades of industry expertise, we specialize in garment services.
              </p>
              <div className="mt-12 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    25<sup className="text-xl">+</sup>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Years in Business
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    50<sup className="text-xl">+</sup>
                  </div>
                  <div className="text-sm font-bold text-gray-900 mt-1">
                    Country
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    20<sup className="text-xl">+</sup>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Total Manpower</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    50<sup className="text-xl">+</sup>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Sourcing Factories
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    30000
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Number Of Workers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    250000
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Per Day Production</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Who Are We & Our Expertise --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Are We?</h2>
                    <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
                AARYAN SOURCING is a Dhaka, Bangladesh-based ready-made garments manufacturing company with a professional merchandising and support team. We offer a comprehensive suite of services for fashion businesses worldwide, encompassing sourcing, manufacturing, and distribution. We manage every step, from design to distribution, to support your growth in the challenging global marketplace.
                </p>

                <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Expertise in Apparel Sourcing & Manufacturing</h3>
                    <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
                </div>
                <p className="text-gray-600 leading-relaxed text-center max-w-4xl mx-auto">
                AARYAN SOURCING assists international fashion brands in finding and manufacturing clothes in bulk. We provide product development, sourcing and quality control services. Our staff is always there to help at every step, ensuring our product's quality meets international standards at the most affordable price. We can help manage orders ranging from 500 to 10,000 pieces of custom clothing. We aspire to offer high-quality wholesale clothing while opening up your stocked brand globally.
                </p>
            </div>
        </div>
      </section>

      {/* --- Core Competence Section --- */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Competence</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Guaranteed Service</h3>
              <p className="text-gray-600 text-sm">Our core competence lies in guaranteed service, ranging from apparel sourcing to marketing & development for all fashion brands. We are a one-stop shop for product development, sourcing, and manufacturing.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Global Accessibility</h3>
              <p className="text-gray-600 text-sm">Being a top wholesale clothing company, we have stretched our wings to reach customers all around, including Europe so that you can source wholesale apparel anywhere in the world without any hassle!</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">High Quality</h3>
              <p className="text-gray-600 text-sm">Our solid reputation provides clear evidence of the high-quality fittings we offer. Our customers refer us with confidence to others because of the value we express in our reliable clothing manufacturing services.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Original and Authorised</h3>
              <p className="text-gray-600 text-sm">AARYAN SOURCING is a registered company under the lower court of Dhaka, Bangladesh. We are licensed, have an export license and are members of the Bangladesh Buying House Association.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality Assurance</h3>
              <p className="text-gray-600 text-sm">We priorities our approach to ensure that the products we deliver meet the high standards of production, as each product is thoroughly checked under stringent quality control. We work with startups and established fashion companies.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Professional Team</h3>
              <p className="text-gray-600 text-sm">We have an exceptional team for after-sales service who can speak fluently and professionally with clients to offer sound advice on practical problem-solving with over ten years of experience in this field.</p>
            </div>
          </div>
        </div>
      </section>
      {/* --- Mission and Vision Section --- */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12  rounded-full flex items-center justify-center mr-4"><span className="text-2xl">🎯</span></div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">To assist fashion businesses with the best methods of producing clothes in bulk. We want to be the ones they call for trustworthy, high-quality apparel production services, from concept to delivery. We aim to deliver services that enable our customers to accomplish more, enhance their final product, and increase their revenue. We strive to establish long-term relationships founded on trust and reliability.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12  rounded-full flex items-center justify-center mr-4"><span className="text-2xl">👁️</span></div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">To be a global trend leader in Wholesale Clothing production, providing worldwide fashion brands with a Superior, Eco-friendly, unique blend of quality at reasonable prices. We aim to transform the industry by fostering lasting relationships and producing products that meet both ethical and quality standards. Our goal is to enable brands to scale while minimizing environmental damage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Why Work With Us Section --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work with Aaryan Sourcing?</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[ { title: "Buying Agents & Delegates", description: "Precisely managing huge orders on behalf of clients located across the globe." }, { title: "Affordable & Quality Sourcing", description: "Process robust, quality-tested apparel at the best value from compliant factories." }, { title: "QC/Inspection", description: "On-site, inline checks, and final inspections to ensure your product is free from defects." }, { title: "Always on Time!", description: "On-time Delivery & Logistics service that lets you control your lead times by delivering parts and products the moment you need." }, { title: "Strong Manufacturing Network", description: "Working with over 50 high-quality manufacturers and 30,000 seasoned production workers." }, { title: "Wide Product Range", description: "We provide knitted, woven, sweater, underwear, sportswear, workwear, headwear, and home textiles." }, { title: "Certified & Compliant Factories", description: "Abiding by international safety, ethical, and sustainability standards is at the forefront of responsible manufacturing." }, { title: "Flexible Terms", description: "Safe transactions, customizable payment terms, and negotiable production lead times." }, { title: "Massive Market Share", description: "Reliable sourcing partner for major fashion brands in Europe, the USA, and around the world." }, { title: "Customer Service", description: "Offering our customers a one-on-one service, making them feel like the heart of the business." } ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-yellow-400 hover:shadow-md transition-all">
                <div className="flex items-start">
                  <span className="text-yellow-500 font-bold text-xl mr-3">✓</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Duties and Social Responsibility --- */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Duties & Social Responsibility</h2>
                <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">What We Have to Do</h3>
                    <ul className="space-y-3 text-gray-600 text-sm list-disc list-inside">
                        <li><b>Bespoke Design:</b> Designing clothing as per the exact designs and requirements of our customers.</li>
                        <li><b>Speed Pricing and Costing:</b> Quickly provide accurate pricing and costing to promote transparency.</li>
                        <li><b>Fast Sample Production:</b> Specialise in rapid sample creation to meet buyers' expectations for quick approval.</li>
                        <li><b>Quality over Quantity:</b> All products are carefully curated and chosen by our professional purchasing team.</li>
                        <li><b>Fabric & Trim Sourcing:</b> We have a vast fabric and trim library for an edited selection of today’s substances.</li>
                        <li><b>Customisation:</b> We can custom print, appliqué, and embroider any item to the customer's needs.</li>
                    </ul>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Being Responsible in Society</h3>
                     <ul className="space-y-3 text-gray-600 text-sm list-disc list-inside">
                        <li><b>Safe and Ethical Workplace:</b> We pledge to maintain a safe workplace and follow buyer codes of conduct for ethical business.</li>
                        <li><b>Worker Welfare Programs:</b> We have special welfare committees for the upliftment of our workers in health, education & personal development.</li>
                        <li><b>Sustainable Labour practices:</b> We adhere to fair labour practices to ensure each staff member works in a respectful and supportive environment.</li>
                        <li><b>Community Engagement:</b> We are involved in local community social activities, contributing to responsible business practices.</li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* --- Strengths and Quality Control --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Strengths & Quality System</h2>
                <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-lg border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">What We Do Best</h3>
                    <ul className="space-y-3 text-gray-600 text-sm list-disc list-inside">
                        <li><b>Manufacturing in Compliance Factories:</b> All items are made in factories that comply with international regulations against child labour.</li>
                        <li><b>Wide variety of stock-lot items:</b> We have a wide range of stock-lot items for pocket-friendly and good quality products.</li>
                        <li><b>Quality at an affordable price:</b> We promise the best quality at the most competitive prices.</li>
                        <li><b>On-Time, Reliable Service:</b> Goods are delivered on time, keeping our customers' confidence and trust.</li>
                        <li><b>Long-term Relationships:</b> We value open and honest communication from the start to build trust.</li>
                        <li><b>Quality Raw-material Sourcing:</b> Our sourcing ensures the use of quality, strong, and hard-wearing raw materials.</li>
                    </ul>
                </div>
                <div className="bg-white p-8 rounded-lg border border-gray-200">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">System for Quality Control</h3>
                    <ul className="space-y-3 text-gray-600 text-sm list-disc list-inside">
                        <li><b>Ongoing Monitoring:</b> Quality Assurance Inspectors are dispatched to manufacturing plants to ensure standards are met.</li>
                        <li><b>Progress Communication:</b> Weekly management meetings and customer conferences to keep everyone informed.</li>
                        <li><b>Sample Consistency:</b> We ensure each lot manufactured matches the quality of the approved sample.</li>
                        <li><b>In-Process Inspections:</b> Our team visits the production line regularly to identify and correct any issues early.</li>
                        <li><b>Final Product Checking:</b> All items undergo a final check before being shipped to ensure no defects.</li>
                        <li><b>Continuous Improvement:</b> We continually upgrade our quality control systems with the latest technologies.</li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* --- Production Capacity Section --- */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Production Capacity</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-lg border border-yellow-200 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Knit</h3>
              <p className="text-4xl font-bold text-yellow-600 mb-2">10,00,000</p>
              <p className="text-gray-600 font-semibold">pieces per month</p>
              <div className="mt-4 pt-4 border-t border-yellow-300"><p className="text-sm text-gray-600">Production Time: <span className="font-semibold text-gray-900">45-60 days</span></p></div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-lg border border-yellow-200 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Woven</h3>
              <p className="text-4xl font-bold text-yellow-600 mb-2">5,00,000</p>
              <p className="text-gray-600 font-semibold">pieces per month</p>
              <div className="mt-4 pt-4 border-t border-yellow-300"><p className="text-sm text-gray-600">Production Time: <span className="font-semibold text-gray-900">90-120 days</span></p></div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-lg border border-yellow-200 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sweater</h3>
              <p className="text-4xl font-bold text-yellow-600 mb-2">3,00,000</p>
              <p className="text-gray-600 font-semibold">pieces per month</p>
              <div className="mt-4 pt-4 border-t border-yellow-300"><p className="text-sm text-gray-600">Production Time: <span className="font-semibold text-gray-900">120-140 days</span></p></div>
            </div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 text-center">
            <p className="text-gray-700"><span className="font-semibold">Note:</span> For repeat orders, the lead time can be reduced and is negotiable during the order placement process.</p>
          </div>
        </div>
      </section>

       {/* --- Product Range & Inventory Section --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Range & Inventory</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Circular Knits</h3>
              <p className="text-gray-600 text-sm">We offer a diverse range of Circular knit fabrics in 100% Cotton, CVC, PC blends and speciality fabrics such as Organic Cotton / Modal / Fair Trade to meet the ever-evolving needs of the market.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Weft Knits</h3>
              <p className="text-gray-600 text-sm">Our weft knit collection consists of many different yarns and constructions, including state-of-the-art fancy yarns and multi-gauge capabilities, perfect for creating something with shiny, sparkling, and outstanding beauty.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Woven Products</h3>
              <p className="text-gray-600 text-sm">We stock a variety of woven fabrics such as denim, twill, corduroy and poplin in some finishes. These materials can be utilised in various non-fungal applications, as the range of possible uses is virtually endless.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Home Textile Products</h3>
              <p className="text-gray-600 text-sm">We offer towels, bath robes, beach towels, bed covers, pillowcases, and all other home textiles. We focus on long-lasting and natural materials to design & manufacture durable goods.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b-2 border-yellow-400 pb-2">Tops</h3>
              <p className="text-gray-600 text-sm leading-relaxed">T-shirts, polo shirts, tank tops, blouses, sweatshirts, hooded garments, leggings, sleepwear, hoodies, long/short-sleeved tops, crop tops, activewear tops, thermal tops, sports bras, button-downs, fleece garments, cardigans, and tunics.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b-2 border-yellow-400 pb-2">Shirts</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Business shirts, work shirts, casual/formal shirts, check shirts, oxford, flannel, linen, denim, plaid, printed, western, button-up, and performance shirts in various fits.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b-2 border-yellow-400 pb-2">Bottoms</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Denim, chinos, shorts, trousers, cargo pants, sweatpants, joggers, skinny jeans, straight-leg, bootcut, Bermuda shorts, capri, dress trousers, hiking, relaxed-fit, track pants, leggings, yoga pants, wide-leg, and pleated trousers.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b-2 border-yellow-400 pb-2">Sweaters</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Flat Knit Pullovers, Cardigans, Ponchos, Vests in Wool, Cashmere, Chunky, Lightweight. Crew neck, V-neck, turtlenecks, zip-up fleece, cable-knit, Sweater dresses, and Batwing Tunics.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b-2 border-yellow-400 pb-2">Underwear</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Briefs, Boxers, Panties, Slips, Thongs, Bikini Briefs, Boxer Briefs, Seamless, Sports Underwear, Shapewear, Boy Shorts, Maternity, Hipster, High-Waisted, and Thermal Underwear.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b-2 border-yellow-400 pb-2">Workwear</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Padded jackets, padded vests, coveralls, safety overalls, work trousers, work jackets, work boots, utility shirts, industrial uniforms, high-visibility jackets, work gloves, welding jackets, insulated uniforms, and protective clothing.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b-2 border-yellow-400 pb-2">Sportswear & Socks</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Running shirts, sports bras, compression tights, jogging pants, gym shorts, sports jackets, track jackets, yoga pants, cycling jerseys, performance tights, workout hoodies, basketball shorts, soccer socks, sports socks, compression sleeves, crew socks.</p>
            </div>
             <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b-2 border-yellow-400 pb-2">Home Textiles</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Sheets, Pillow Cases, Curtains, Towels, Bath Robes, Quilts, Duvet Covers, Mattress Protectors, Bedspreads, Pillow Shams, Table Cloths, Bath Rugs, Shower Curtains, Cushion Covers, Tea Towels, Blankets, Comforters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Operations and Support Section --- */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Operations & Global Reach</h2>
                <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Expected Market</h3>
                    <p className="text-gray-600 text-sm">We have customers worldwide, but our primary focus is on Canada, the US, France, Spain, Italy, the UK, South Africa, and the Middle East. We operate in multiple markets, allowing us to offer options tailored to various fashion needs and trends.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Department of Shipping</h3>
                    <p className="text-gray-600 text-sm">Two experts manage the shipping department, monitoring shipping lines, freight forwarders, and vessel bookings to ensure timely and efficient deliveries with minimal supply chain impact.</p>
                </div>
                 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Tech Support</h3>
                    <p className="text-gray-600 text-sm">We have a team of textile engineering graduates providing professional technical support to companies in selecting fabrics and ensuring clothes fit nicely, meeting the highest quality standards.</p>
                </div>
                 <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">Development of Washing</h3>
                    <p className="text-gray-600 text-sm">We are focused on creating fancy washes tailored to specific markets. Our water treatment plants ensure that washing clothes can be done in an environmentally friendly manner, helping clothes appear and last longer.</p>
                </div>
            </div>
        </div>
      </section>

      {/* --- Contact and Bank Info Section --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
           <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact & Banking</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b-2 border-yellow-400 pb-2">Contact Information</h3>
              <p className="text-sm text-gray-600 font-semibold">Registered Address:</p>
              <p className="text-sm text-gray-600 mb-2">Plot-32/C, Tropicyl Alauddin Tower, Road-02, Sector-03, Uttara Model Town, Dhaka-1230, Bangladesh</p>
              <p className="text-sm text-gray-600 font-semibold">Contact Address:</p>
              <p className="text-sm text-gray-600 mb-2">House: 19, Road: 07, Sector: 10, Uttara Model Town, Dhaka-1230, Bangladesh</p>
              <p className="text-sm text-gray-600"><span className="font-semibold">Telephone:</span> +88-02-55091910</p>
              <p className="text-sm text-gray-600"><span className="font-semibold">WeChat:</span> aasourcingltd</p>
              <p className="text-sm text-gray-600 font-semibold mt-4">Contact Person:</p>
              <p className="text-sm text-gray-600">Md. Khorshed Alam</p>
              <p className="text-sm text-gray-600"><span className="font-semibold">Cell:</span> +880 1713 11 78 49</p>
              <p className="text-sm text-gray-600"><span className="font-semibold">Email:</span> aaryansourcing@gmail.com</p>
            </div>
            <div className="lg:col-span-2 grid grid-rows-2 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b-2 border-yellow-400 pb-2">Bank Details</h3>
                 <p className="text-sm text-gray-600"><span className="font-semibold">Account Name:</span> Aaryan Sourcing</p>
                 <p className="text-sm text-gray-600"><span className="font-semibold">Bank Name:</span> SBAC Bank Limited</p>
                 <p className="text-sm text-gray-600"><span className="font-semibold">Branch:</span> Pragati Sarani Branch</p>
                 <p className="text-sm text-gray-600"><span className="font-semibold">Address:</span> Manama MS Toren, GA-99/3 A&B, Pragati Sarani, Badda, Dhaka-1000</p>
                 <p className="text-sm text-gray-600"><span className="font-semibold">Account Number:</span> 0060 11100 3868</p>
                 <p className="text-sm text-gray-600"><span className="font-semibold">SWIFT:</span> SBACBDDH</p>
              </div>
               <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 border-b-2 border-yellow-400 pb-2">Payment Methods</h3>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Letter of Credits (LCs) at sight (Irrevocable and Transferable).</li>
                    <li>Advance TT.</li>
                    <li>After establishing a relationship, a convenient payment method can be mutually agreed upon.</li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}