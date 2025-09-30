import Link from "next/link";
import { FaBoxOpen } from "react-icons/fa";
import { IoDiamondOutline } from "react-icons/io5";
import ProductCarousel from "./ProductCarousel";

const NewArrivals = ({ allProducts }) => {

    const renderLayout = (content) => (
        <section className="bg-white py-5 mb-10 px-4">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
                        Our Highlight Products
                    </h2>
                    <div className="flex justify-center items-center my-6 space-x-4">
                        <div className="w-16 h-px bg-gray-300"></div>
                        <IoDiamondOutline className="w-5 h-5 text-gray-700" />
                        <div className="w-16 h-px bg-gray-300"></div>
                    </div>
                </div>
                <div className="mb-1">
                    <div className="text-center w-full max-w-lg mx-auto">
                        <p className="text-gray-500">
                            Discover our premium T-shirts, polo shirts, and hoodies, crafted
                            for global apparel markets.
                        </p>
                    </div>
                </div>
                
                {content}

                <div className="mt-16 text-center">
                    <Link
                        href="/shop"
                        className="bg-gray-800 text-white px-10 py-3 hover:bg-gray-700 transition-colors"
                    >
                        View All Products
                    </Link>
                </div>
            </div>
        </section>
    );
    
    if (!allProducts || allProducts.length === 0) {
        return renderLayout(
            <div className="text-center py-12 text-gray-500">
                <FaBoxOpen className="text-5xl mx-auto mb-4" />
                <p>No highlight products at the moment. Check back soon!</p>
            </div>
        );
    }

    return renderLayout(<ProductCarousel allProducts={allProducts} />);
};

export default NewArrivals;