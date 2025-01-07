import './LandingPage.css';
//
import { useEffect } from 'react';
//
import SliderBanner from './HeroBanner/SliderBanner';
import Good4MeDeal from './Good4MeDeal/Good4MeDeal';
import Control from './Control/Control';
import OurProduct from './OurProduct/OurProduct';
import Review from './Review/Review';
import ShopAll from './ShopAll/ShopAll';
import LatestNews from './LatestNew/LatestNews';
import Good4MeSlider from './Good4MeSlider/Good4MeSlider';
//
import ErrorBoundary from '../../../Support/Error/ErrorBoundary';

const LandingPage = () => {
    useEffect(() => {
        document.title = 'Gumi Shopify - Home';

        return () => {
            document.title = 'Gumi Shopify';
        };
    }, []);

    return (
        <ErrorBoundary>
            <SliderBanner />
            <Good4MeDeal
                tittle="GOOD4ME DEAL"
                content="Pick your beauty products today. 50% OFF on the most popular
                GOOD4ME. Order all classy products today!"
            />
            <Control
                title="TAKE CONTROL OF YOUR HEALTH"
                content="The Good4Me range has been formulated based on scientific &
                traditional evidence.
                Our vitamins are here and ready to boost your mood, immunity
                and overall well-being!
                Made in New Zealand from local and imported ingredients."
                btn="BROWSE OUR RANGE"
            />
            <OurProduct title="OUR PRODUCT" />
            <Review />
            <ShopAll title="SHOP ALL" />
            <LatestNews title="LATEST NEWS" />
            <Good4MeSlider title="#GOOD4ME" />
        </ErrorBoundary>
    );
};

export default LandingPage;
