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

const Home = ({slides, allProducts, blogs, commentCounts, featuredData, newarrivalData, trendingData}) => {


  return (
    <div>
      <Banner slides={slides} /> *
      <QualitySection />
      <CollectionsGrid />
      <NewArrivals allProducts={newarrivalData} />
      <FeaturedCollection allProducts={featuredData} />
      <Collections />
      <CommitmentsSection />
      <Trending allProducts={trendingData} />
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