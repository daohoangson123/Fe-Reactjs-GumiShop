import SliderBanner from '../HeroBanner/SliderBanner/SiderBanner';
import Good4MeDeal from '../Good4MeDeal/GoodDeal/Good4MeDeal';
import Control from '../Control/Control';
import OurProduct from '../OurProduct/OurProduct';
import LatestNew from '../LatestNew/LatestNew/LatestNew';
import Good4MeSlider from '../Good4MeSilder/Good4MeSlider';
import Review from '../Review/Review';
import ShopAll from '../ShopAll/ShopAll';
//
import { useEffect } from 'react';

const LandingPage = () => {
    useEffect(() => {
        const sect = document.querySelectorAll('section');

        sect.forEach((item) => item.classList.add('hide'));

        const hiddenSect = document.querySelectorAll('.hide');

        function show() {
            const windowHeight = window.innerHeight;
            const elementVisible = 10;
            hiddenSect.forEach((item) => {
                const elementTop = item.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    item.classList.add('show');
                    item.classList.remove('hide');
                }
            });
        }

        window.addEventListener('scroll', show);
    });

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
