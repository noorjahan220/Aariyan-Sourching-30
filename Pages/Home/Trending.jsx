import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5"; 
import ProductCarousel from "./ProductCarousel";

const Trending = ({ allProducts }) => {

    const renderLayout = (content) => (
        <section className="bg-white py-10 px-4 mb-10">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">Trending Products</h2>
                    {/* The fix is applied here 👇 */}
                    <div className="flex justify-center items-center my-6 space-x-4">
                        <div className="w-16 h-px bg-gray-300"></div>
                        <IoDiamondOutline className="w-5 h-5 text-gray-700" /> 
                        <div className="w-16 h-px bg-gray-300"></div>
                    </div>
                </div>
                <div className="text-center w-full max-w-5xl mx-auto mb-1">
                    <p className="text-gray-500">
                        Explore Aaryan Sourcing's popular products to enhance your business. We provide premium wholesale goods and innovative supply chain solutions, catering to retailers and e-commerce. Keep a step ahead with our affordable, high-demand items. Follow us for the newest sourcing trends and exclusive deals.
                    </p>
                </div>
                {content}

                <div className="mt-16 text-center">
                    <Link href="/shop" className="bg-gray-800 text-white px-10 py-3 hover:bg-gray-700 transition-colors">View All Products</Link>
                </div>
            </div>
        </section>
    );

    if (!allProducts || allProducts.length === 0) {
        return renderLayout(
            <div className="text-center py-12 text-gray-500">
                <FaBoxOpen className="text-5xl mx-auto mb-4" />
                <p>No trending products at the moment. Check back soon!</p>
            </div>
        );
    }

    return renderLayout(<ProductCarousel allProducts={allProducts} />);
};

export default Trending;