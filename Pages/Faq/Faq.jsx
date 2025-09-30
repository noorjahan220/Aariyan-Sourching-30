"use client";
import Image from "next/image";
import { useState } from "react";
import CommonBanner from "../../components/CommonBanner";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const categorizedFaqs = {
    "General Information": [
      {
        question: "What is Apparel Sourcing?",
        answer:
          "Apparel sourcing involves sourcing suppliers of clothes, selecting materials, trims, and styles, and overseeing the clothing production process. It consists of vetting factories, negotiating costs, and ensuring a level of quality. How does Aaryan Sourcing? help businesses in garment manufacturing? We provide end-to-end garment production services, including fabrication, sewing, washing, and quality control. We help to find reliable facilities, track manufacturing timelines, and ensure the final product meets your quality standards. Types of clothing that Aaryan Sourcing. Can make. Our main products include Casual wear, sportswear, and Fashion wear for men, women, and kids. We accept customized and OEM orders",
      },
      {
        question:
          "How does Aaryan Sourcing help businesses in garment manufacturing?",
        answer:
          "We provide end-to-end garment production services, including fabrication, sewing, washing, and quality control. We connect you with a reputable factory, assist in sourcing the best fabrics, and ensure all production meets your quality requirements and specifications. Our goal is to reduce the lead time and cost for our customers by maintaining high-quality standards.",
      },
      {
        question: "How do I begin sourcing clothing with Aaryan Sourcing?",
        answer: "let us know what you need, and we will handle the rest.",
      },
      {
        question: "How does Aaryan Sourcing? help you with apparel sourcing?",
        answer:
          "At Aaryan Sourcing. we have the entire solution for apparel sourcing. We connect you with a reputable factory, assist in sourcing the best fabrics, and ensure all production meets your quality requirements and specifications.",
      },
      {
        question: "What kinds of clothing can you make?",
        answer:
          "Aaryan Sourcing. Specializes in delivering a variety of garments to businesses, from small boutiques to large retailers. We specialize in a variety of garment categories:\nInformal: Tees, hoodies, jeans, skirts, and dresses.\nActivewear & Sportswear: Workout clothes, bottoms, sports bras, and gym gear.\nOuterwear: Jackets, coats, and raincoats.\nWorkwear & The Uniforms – Corporate uniforms, safety, and custom workwear.\nFormal & Fashion: unisex suits, blouses, men’s and women’s uniforms.\nKids wear: Children’s clothes, tops and bottoms, outerwear.\nLingerie & Swimwear: By which I mean, bras and panties and bikinis, even trunks.\nAccessory Items: Hats, scarves, socks, and fashion accessories such as gloves.\nWhether method, material, or design, we collaborate with reputable manufacturers and suppliers for your garment projects. Let us help you create quality garments that fit your lifestyle",
      },
      {
        question: "Do you offer custom designs for clothing?",
        answer:
          "Yes, we specialize in custom clothing design with your vision in mind. Our capabilities range from concept design to finished product, including custom logos, pattern making, sourcing materials, and full production. Whether you're creating a one-off special or launching a white label, we manage the project so it is simple, quick, and in line with your brand.",
      },
      {
        question: "Can you source eco-friendly fabrics?",
        answer:
          "We certainly do focus on sustainability and eco-friendly fabrics. We partner with ethical suppliers to help your  brand become more eco-friendly",
      },
      {
        question: "How do I get started on it?",
        answer:
          "Get in touch with us to send us your requirement, and we will assist you with the entire sourcing & production process.",
      },
      {
        question: "What are your quality control procedures?",
        answer:
          "Aaryan Sourcing will never compromise quality. We offer a strict pre-production sampling process, allowing you to confirm that the design and materials meet your requirements & industry standards before production begins.\nIn-line Inspection – Our QA team gets onto the shop floor to inspect stitching quality, fabric quality, and workmanship. This guarantees the homogeneity of quality across the production.\nPost-Production checking: After the garments are made, examine the piece of ready garment on every aspect, such as measurement / check measurement/ size, colour, and fabric.\nTesting: We test our fabrics and apparel to ensure quality, durability, and longevity.\nPackaging & Shipping: We also provide end-of-line packaging to ensure that your stands are optimally packaged.\nWe have a sound QC Testing system to guarantee you receive clothing of high quality.",
      },
    ],

    "Orders and Returns": [
      {
        question: "How to order?",
        answer:
          "Ordering from Aaryan Sourcing is easy. Contact us on our website, email, or phone to discuss your project! We will help you decide what type of clothing to wear. We can help with printing, embroidery, and numbers. Once we receive your design and specifications, we will provide a quote and lead time. Quintieri says production of the next edition will begin as soon as the first purely online version is approved.",
      },
      {
        question: "How do I place an order with Aaryan Sourcing?",
        answer:
          "It’s easy to order from Aaryan Sourcing. How to begin: Tell us about your needs and get a response. Form or email us your Apparel Requirements. Description: The product item name, including the materials it is made of, the design pattern, etc.\nProduct Knowledge: Our staff will come over to help you decide on what you need and where the products can be made.\nQuotations and Agreements: We can offer you a free sample after full confirmation. We will send the latest sample after we get the final deposit. We will provide a quote once we receive the price description and other relevant details. Production planning starts once pricing and terms are established.\nProduct and Q/C: We will manage production and Q/C as we said. After the order is independently produced, we will send it to you quickly and safely. Begin your order today, and don’t hesitate to contact us for your dream attire.",
      },
      {
        question: "How do I request a quote on my garment order?",
        answer:
          "How to Get a Quote for Your Clothes. If you're ready to start your custom order and would like to know the price, Aaryan Sourcing is the place to go. Here’s how you can begin:\nContact Us: Send us a message on our website or an email with specific details about your order. Insert more copy here as needed (I won't be doing this for all of them), including number, type of clothing/quantity, design, material, etc., anything else you want to tailor.\nConsulting: We will assess your request and may require additional information to ensure that we understand the brief. If necessary, we can talk about fabric choices, designs, and deadlines.\nQuote: We will quote you a price, lead time, and shipping cost based on your information. We are transparent and assist you in finding the best cost-effective solution.\nTerms to Agree: We’ll get into production once you’ve signed off on the price.\nIf you’re interested in reclaiming your clothing, get in touch today to receive a personalized quote.",
      },
      {
        question: "What are the MOQs?",
        answer:
          "Our MOQs (Minimum Order Quantities) vary depending on the types of products and customization. We cater to both small and large businesses, enabling us to adapt to whatever needs arise.",
      },
      {
        question: "How can I order from Aaryan Sourcing?",
        answer:
          "Buy from Aaryan Sourcing. Registering with Aaryan Sourcing is so simple. What to do next:\nContact Us: Let us know your clothing requirements - such as designs, product types, materials, colors, and sizes - via our website or e-mail.\nConsultation & Sampling: We will assess your needs and recommend improved factories and fabrics. We can provide test samples if necessary. Upon checking the order, the pricing and production time will be quoted. It will be provided in response to your submitting an order.\nEnd production: We will carry out production with the quality control and delivery term compliance. When you order, we bring your stuff right to your door in perfect condition and on time. Order from us today.",
      },
      {
        question: "Do You Do Custom Design for Clothing?",
        answer:
          "Yes, with Aaryan Sourcing. We specialize in custom clothing design with your vision in mind. Our job is to work with you to make your design idea a reality, whether you are a brand looking for a signature collection or a retailer wanting quality product your way.\nOur capabilities range from concept design to finished product, highlighting custom logos, pattern making, sourcing materials, and full production. We have talented designers and highly professional making workers. All of our products feature stunning product design, and indeed, we also have a wealth of experience in custom clothing.\nWe offer a wide range of options, from casual wear to sports and uniforms to fashion. Whether you are creating a one- off special or launching a white label, we manage the project so it is simple, quick, and in line with your brand.\nIn what way can we help you achieve your dream?",
      },
    ],

    "Shipping Information": [
      {
        question: "What is the typical lead time for an apparel order?",
        answer:
          "A real order lead time in Aaryan Sourcing. Regular turnaround time is 8-12 weeks, depending on the quantity, the complexity, and special requests for your garments. Here’s how that process works:\nDesign & Sampling: Customized or a sample for this problem needs 1-2 weeks. We would love to collaborate closely with you to ensure the design meets your needs and is ready for production.\nProduction: For general mass production,5/6 weeks. The lead time will also be modified according to the production season.\nQuality Control: All our products are controlled by our quality dep. Rending orders production takes 1 to 1.5 weeks, aside from your order preparation time.\nShipping & Delivery: Time: The shipping time varies by destination; It will take 5 – 10 days (ERR and data on the way).\nWe pride ourselves on being fast and providing quality clothing done on time, just the way you need.",
      },
      {
        question: "How long does production take?",
        answer:
          "Lead time varies depending on the complexity and quantity of the order. Bulk orders typically take 4-6 weeks to process.",
      },
    ],

    "Payment Information": [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept various payment methods including bank transfers and major credit cards. Please contact us for specific details regarding your order and payment terms.",
      },
    ],
  };

  const allFaqs = Object.values(categorizedFaqs).flatMap(
    (category) => category
  );

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white font-sans">
      <CommonBanner
        backgroundImage={"/faq-banner.jpg"}
        breadcrumb={"faq"}
      ></CommonBanner>

      <main className="mx-auto px-4 lg:px-2 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-2/5 flex-shrink-0">
              <Image
                src="/FAQ.jpg"
                alt="A visual guide to frequently asked questions"
                width={500}
                height={200}
                className="w-full h-auto rounded-lg "
              />
            </div>

            <div className="w-full md:w-3/5">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                Welcome to Aaryan Sourcing FAQs. Below, we've posted answers to
                some frequently asked questions about our clothing sourcing,
                garment manufacturing, and custom clothing. If you are new to
                ordering custom clothing or have a unique request, you will find
                the information you need to get started
              </p>
            </div>
          </div>

          <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-10 lg:gap-x-16">
            <div>
              <div className="space-y-0">
                {allFaqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200">
                    <div
                      className="flex justify-between items-center cursor-pointer group p-4 transition-colors duration-300 hover:bg-gray-50"
                      onClick={() => handleToggle(index)}
                    >
                      <p className="text-gray-800 font-bold pr-4 group-hover:text-[#f5b750] transition-colors duration-200">
                        {faq.question}
                      </p>

                      <div className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-gray-100 group-hover:bg-[#f8c255] transition-colors duration-300">
                        <span
                          className={`text-xl font-semibold text-gray-600 group-hover:text-black transform transition-transform duration-300 ${
                            openIndex === index ? "rotate-180" : ""
                          }`}
                        >
                          {openIndex === index ? "−" : "+"}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`overflow-hidden transition-all ease-in-out duration-500 ${
                        openIndex === index ? "max-h-screen" : "max-h-0"
                      }`}
                    >
                      <div className="px-4 pb-5">
                        <p className="pt-2 text-gray-600 text-sm leading-relaxed pl-4 border-l-2 border-[#f8c255]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-[#f8c255] p-6 sm:p-8 rounded-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Ask a Question
                </h2>
                <p className="text-sm text-gray-700 mb-6 max-w-xs">
                  Please feel free to contact us, our customer support will be
                  happy to help you.
                </p>
                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-2.5 bg-white border-none rounded-md focus:ring-2 focus:ring-[#e4a83c] transition-shadow duration-200"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2.5 bg-white border-none rounded-md focus:ring-2 focus:ring-[#e4a83c] transition-shadow duration-200"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="comment"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      rows="5"
                      className="w-full p-2.5 bg-white border-none rounded-md focus:ring-2 focus:ring-[#e4a83c] resize-y transition-shadow duration-200"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#2d2d2d] hover:bg-black cursor-pointer text-white px-8 py-2.5 font-semibold text-sm rounded-md transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2d2d2d] active:scale-95"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Faq;
