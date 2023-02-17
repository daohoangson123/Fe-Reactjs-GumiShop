// import HeroBanner from "../MAIN/HeroBanner/HeroBanner";
import SliderBanner from "./HeroBanner/SiderBanner";
import Good4MeDeal from "./Good4MeDeal/Good4MeDeal";
import Good4MeSlider from "./Good4Me/Good4Me";
import LatestNew from "./LatestNew/LatestNew";
import OurProduct from "./OurProduct/OurProduct";

const LandingPage = () => {
    return (
        <>
            <SliderBanner />
            <Good4MeDeal />
            <OurProduct />
            <LatestNew />
            <Good4MeSlider />
        </>
    )
}

export default LandingPage;