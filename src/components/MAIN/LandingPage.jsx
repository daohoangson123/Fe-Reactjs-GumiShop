// import HeroBanner from "../MAIN/HeroBanner/HeroBanner";
import SliderBanner from "./HeroBanner/SiderBanner";
import Good4MeDeal from "./Good4MeDeal/Good4MeDeal";
import Control from "./CONTROL/Control";
import OurProduct from "./OurProduct/OurProduct";
import LatestNew from "./LatestNew/LatestNew";
import Good4MeSlider from "./Good4MeSilder/Good4MeSlider";
import Review from "./REVIEW/Review";

const LandingPage = () => {
    return (
        <>
            <SliderBanner />
            <Good4MeDeal />
            <Control/>
            <OurProduct />
            <Review/>
            <LatestNew />
            <Good4MeSlider />
        </>
    )
}

export default LandingPage;