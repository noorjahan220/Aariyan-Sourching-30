import AtAGlance from "./AtAGlance";
import Banner from "./Banner";
import Collections from "./Collections";
import CollectionsGrid from "./CollectionsGrid";
import CommitmentsSection from "./CommitmentsSection";
import CoreCustomersSection from "./CoreCustomersSection";
import FeaturedCollection from "./FeaturedCollection";
import InstagramFeed from "./InstagramFeed";
import LatestNewsSection from "./LatestNewsSection";
import LookbookSection from "./LookbookSection";
import NewArrivals from "./NewArrivals";
import Newsletter from "./Newsletter";
import QualitySection from "./QualitySection";
import Testimonials from "./Testimonials";
import Trending from "./Trending";
import WhyChooseAA from "./whyChooseAA";

const Home = ({slides, allProducts, blogs, commentCounts}) => {


  return (
    <div>
      <Banner slides={slides} /> *
      <QualitySection />
      <CollectionsGrid />
      <NewArrivals allProducts={allProducts} />
      <FeaturedCollection allProducts={allProducts} />
      <Collections />
      <CommitmentsSection />
      <Trending allProducts={allProducts} />
      <LookbookSection />
      <WhyChooseAA />
      <AtAGlance />
      <Newsletter />
      <Testimonials />
      <CoreCustomersSection />
      <LatestNewsSection
        blogs={blogs}
        commentCounts={commentCounts}
      />
      <InstagramFeed />
    </div>
  );
};

export default Home;