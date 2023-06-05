import { Suspense, lazy, useEffect } from 'react';
//
const SliderBanner = lazy(() =>
    import('../../Pages/LandingPage/HeroBanner/SliderBanner'),
);
const Good4MeDeal = lazy(() =>
    import('../../Pages/LandingPage/Good4MeDeal/Good4MeDeal'),
);
const Control = lazy(() => import('../../Pages/LandingPage/Control/Control'));
const OurProduct = lazy(() =>
    import('../../Pages/LandingPage/OurProduct/OurProduct'),
);
const Review = lazy(() => import('../../Pages/LandingPage/Review/Review'));
const ShopAll = lazy(() => import('../../Pages/LandingPage/ShopAll/ShopAll'));
const LatestNews = lazy(() =>
    import('../../Pages/LandingPage/LatestNew/LatestNews'),
);
const Good4MeSlider = lazy(() =>
    import('../../Pages/LandingPage/Good4MeSilder/Good4MeSlider'),
);
//

const LandingPage = () => {
    useEffect(() => {
        document.title = 'Gumi Shopify';
    });
    return (
        <>
            <SliderBanner />
            <Suspense>
                <Good4MeDeal
                    tittle='GOOD4ME DEAL'
                    content='Pick your beauty products today. 50% OFF on the most popular
                GOOD4ME. Order all classy products today!'
                />
                <Control
                    title='TAKE CONTROL OF YOUR HEALTH'
                    content='The Good4Me range has been formulated based on scientific &
                traditional evidence.
                Our vitamins are here and ready to boost your mood, immunity
                and overall well-being!
                Made in New Zealand from local and imported ingredients.'
                    btn='BROWSE OUR RANGE'
                />
                <OurProduct title='OUR PRODUCT' />
                <Review />
                <ShopAll title='SHOP ALL' />
                <LatestNews title='LATEST NEWS' />
                <Good4MeSlider title='#GOOD4ME' />
            </Suspense>
        </>
    );
};

export default LandingPage;
