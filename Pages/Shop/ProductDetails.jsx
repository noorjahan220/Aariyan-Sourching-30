import CommonBanner from "../../components/CommonBanner";

import ProductDetailsTabs from "./ProductDetailsTabs";
import FavouriteProducts from "../Home/FavouriteProducts";

import LoadingSpinner from "../../components/LoadingSpinner";

import ProductDetailsClient from "../../components/ProductDetailsClient";

const ProductDetails = ({ id, myProductData }) => {
  if (!myProductData) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <main>
      <CommonBanner title="shop" breadcrumb="products details" />

      <ProductDetailsClient
        myProductData={myProductData}
      ></ProductDetailsClient>

      <section className="w-full max-w-6xl mx-auto px-4 lg:px-2">
        <ProductDetailsTabs
          category={myProductData?.productCategory}
          productId={id}
        />
        <FavouriteProducts></FavouriteProducts>
      </section>
    </main>
  );
};

export default ProductDetails;