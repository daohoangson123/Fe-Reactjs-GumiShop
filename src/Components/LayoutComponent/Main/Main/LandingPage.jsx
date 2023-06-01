import SliderBanner from '../HeroBanner/SliderBanner/SiderBanner';
import Good4MeDeal from '../Good4MeDeal/GoodDeal/Good4MeDeal';
import Control from '../Control/Control';
import OurProduct from '../OurProduct/OurProduct';
import LatestNews from '../LatestNew/LatestNews/LatestNews';
import Good4MeSlider from '../Good4MeSilder/Good4MeSlider';
import Review from '../Review/Review';
import ShopAll from '../ShopAll/ShopAll';
//

const LandingPage = () => {
    return (
        <>
            <SliderBanner />
            <Good4MeDeal />
            <Control />
            <OurProduct />
            <Review />
            <ShopAll />
            <LatestNews />
            <Good4MeSlider />
        </>
    );
};

export default LandingPage;
