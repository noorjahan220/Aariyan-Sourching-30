import CommonBanner from "../../../components/CommonBanner";
import ResourceGrid from "../../../Pages/Resource/ResourceGrid";

export const metadata = {
  title: "Aaryan Sourcing – Apparel Resources",
  description:
    "Access Aaryan Sourcing's valuable apparel resources, including product images, size charts, lookbook, and more to enhance your brand’s presence.",
  keywords:
    "Apparel Resources, Product Images, Size Charts, Lookbook, Branding Tools, Aaryan Sourcing, Apparel Marketing Resources, Fashion Resources, Apparel Sourcing Resources, Sourcing Resources, Product Catalogue, Size Charts, Lookbook, Marketing Tools, print & embroidery guides",
  alternates: {
    canonical: "https://www.aaryansourcing.com/apparel-resources",
  },
};

const banner_img = "https://i.ibb.co/QFrKjBwS/resource.webp";

const ResourcePage = () => {
  return (
    <>
      <CommonBanner breadcrumb={"resource"} backgroundImage={banner_img} />

      <div className="max-w-6xl mx-auto py-12 px-4 lg:px-2">
        <div className="text-center text-gray-600 mb-12">
          You have my word that Aaryan Sourcing is the best garment sourcing
          service there is. Top Partnering We provide value-added services,
          including working with honest suppliers to ensure orders are of high
          quality and on time. Aaryan Sourcing understands the ever-growing
          needs of the fashion world and works with manufacturers to fulfil
          clients’ individual needs. Our sourcing, QC and logistical experience
          also enable startups and established brands to operate more
          effectively. Product Description About the Brand Aaryan Sourcing -Our
          passion is apparel that looks great and feels fabulous. Our clothing
          is made in individual pieces, where your own choice is encouraged.
          Shop our selection and you’ll enjoy convenient sourcing too.
        </div>

        <ResourceGrid />
      </div>
    </>
  );
};

export default ResourcePage;
