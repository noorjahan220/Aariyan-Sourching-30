import Image from "next/image";
import CommonBanner from "../../components/CommonBanner";

export default function Profile() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative  text-white ">
        <CommonBanner
          backgroundImage={"/Company-Profile.jpg"}
          breadcrumb={"Profile"}
        ></CommonBanner>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full aspect-video">
              <Image
                src="https://images.unsplash.com/photo-1603400521630-9f2de124b33b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Our Workshop"
                fill
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Established 2010</h3>
              <p className="text-gray-600 mb-4">
                Yellow Thread was born from a passion for quality craftsmanship
                and sustainable fashion. What started as a small boutique in
                Milan has grown into an internationally recognized brand known
                for our attention to detail and commitment to ethical
                production.
              </p>
              <p className="text-gray-600 mb-4">
                Our designs blend timeless elegance with contemporary trends,
                creating pieces that transcend seasons and become staples in any
                wardrobe.
              </p>
              <div className="flex space-x-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">50+</div>
                  <div className="text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">200+</div>
                  <div className="text-gray-600">Stores Worldwide</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">1M+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-2 ">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We take pride in our meticulous manufacturing process that ensures
              quality, sustainability, and ethical practices at every step.
            </p>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Material Sourcing",
                description:
                  "We use only organic cotton, recycled polyester, and sustainable materials from certified suppliers.",
                icon: "🌱",
              },
              {
                title: "Design & Pattern Making",
                description:
                  "Our designers create timeless pieces with careful attention to fit, comfort, and style.",
                icon: "✂️",
              },
              {
                title: "Ethical Production",
                description:
                  "All our garments are produced in facilities that guarantee fair wages and safe working conditions.",
                icon: "👕",
              },
              {
                title: "Quality Control",
                description:
                  "Each garment undergoes rigorous inspection to ensure it meets our high standards.",
                icon: "🔍",
              },
              {
                title: "Sustainable Packaging",
                description:
                  "We use recycled and biodegradable packaging to minimize our environmental impact.",
                icon: "📦",
              },
              {
                title: "Carbon-Neutral Shipping",
                description:
                  "We offset the carbon emissions from all our shipments through verified programs.",
                icon: "🚚",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <div className="text-3xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto  px-4 lg:px-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sustainability Commitment
            </h2>
            <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Fashion That Cares
              </h3>
              <p className="text-gray-600 mb-4">
                At Yellow Thread, we believe looking good should not come at the
                expense of our planet. Thats why we have implemented
                comprehensive sustainability initiatives throughout our supply
                chain.
              </p>

              <div className="space-y-4">
                {[
                  {
                    percent: "100%",
                    text: "of our cotton is organic or recycled",
                  },
                  {
                    percent: "85%",
                    text: "reduction in water usage compared to conventional manufacturing",
                  },
                  {
                    percent: "60%",
                    text: "of our energy comes from renewable sources",
                  },
                  {
                    percent: "Zero",
                    text: "waste to landfill from our production facilities",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded mr-4">
                      {item.percent}
                    </div>
                    <p className="text-gray-600 pt-1">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full aspect-video">
              <Image
                src="
https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1313&q=80"
                alt="Sustainable Materials"
                fill
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-2">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We offer more than just clothing – we provide a complete
              experience with services designed to enhance your style and
              simplify your life.
            </p>
            <div className="w-20 h-1 bg-yellow-400 mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Personal Styling",
                description:
                  "Book a virtual consultation with our style experts",
                icon: "🎨",
              },
              {
                title: "Alterations",
                description:
                  "Perfect fit guaranteed with our tailoring services",
                icon: "📏",
              },
              {
                title: "Care & Repair",
                description:
                  "Extend the life of your garments with our repair program",
                icon: "🧵",
              },
              {
                title: "Circular Program",
                description:
                  "Return old items for recycling and get store credit",
                icon: "♻️",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-100"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
