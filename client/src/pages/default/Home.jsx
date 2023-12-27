import AdsSection from '../../component/home/AdsSection';
import CategorySection from '../../component/home/CategoriesSection';
import FeatureProductSection from '../../component/home/FeatureProductSection';
import HeroCarousel from '../../component/home/HeroCarousel';
import ProductListSection from '../../component/home/ProductListSection';

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <CategorySection />
      <div className="h-1 my-8 bg-orange-500 " />
      <AdsSection />
      <ProductListSection />
      <FeatureProductSection />
      <div className="h-1 my-8 bg-orange-500 " />
    </div>
  );
};

export default Home;
