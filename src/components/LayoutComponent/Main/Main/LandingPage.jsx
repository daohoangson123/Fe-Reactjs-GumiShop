// import HeroBanner from "../MAIN/HeroBanner/HeroBanner";
import SliderBanner from '../HeroBanner/SliderBanner/SiderBanner';
import Good4MeDeal from '../Good4MeDeal/GoodDeal/Good4MeDeal';
import Control from '../Control/Control';
import OurProduct from '../OurProduct/OurProduct';
import LatestNew from '../LatestNew/LatestNew/LatestNew';
import Good4MeSlider from '../Good4MeSilder/Good4MeSlider';
import Review from '../Review/Review';
import ShopAll from '../ShopAll/ShopAll';

const LandingPage = () => {
    return (
        <>
            <SliderBanner />
            <Good4MeDeal />
            <Control />
            <OurProduct />
            <Review />
            <ShopAll />
            <LatestNew />
            <Good4MeSlider />
        </>
    );
};

export default LandingPage;
