import './SliderBanner.css';
//
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//
import banner_data from '../../../../../data/banner';
//
import banner1_1920 from '../../../../../assets/img/HeroBanner1920.jpg';
import banner1_1024 from '../../../../../assets/img/HeroBanner1024.jpg';
import banner1_425 from '../../../../../assets/img/HeroBanner425.jpg';
import banner2 from '../../../../../assets/img/HeroBanner1.webp';
import banner3 from '../../../../../assets/img/HeroBanner2.webp';
import banner1_bg from '../../../../../assets/img/HeroBannerBot.png';
import banner2_bg from '../../../../../assets/img/HeroBannerBot1.png';
//
import SliderItem from './SliderItem/SliderItem';
import { useEffect, useState } from 'react';
import lazyImgCall from '../../../../../data/lazyImg';
import Loading from '../../../UI/Loading/Loading';
//

const SliderBanner = () => {
    useEffect(() => {
        lazyImgCall();
    }, []);
    return (
        <section className="HeroBanner">
            <OwlCarousel
                className="owl-theme"
                responsiveRefreshRate={0}
                items={1}
                dots
            >
                <HeroSlider1 />
                <HeroSlider2 />
                <HeroSlider3 />
            </OwlCarousel>
        </section>
    );
};

const HeroSlider1 = () => {
    const [isImgLoaded, setIsImgLoaded] = useState();

    return (
        <div className="SliderContainer">
            <div
                className="BannerContainer BannerContainer_1"
                title="Drag or swip to see other banner"
            >
                <img
                    src={banner1_425}
                    alt={banner_data[0].name}
                    srcSet={`${banner1_425} 1024w, ${banner1_1024} 1920w, ${banner1_1920} 2560w`}
                    fetchpriority="high"
                    className="BannerContainer_MainImg BannerContainer_MainImg_1"
                    onLoad={() => setIsImgLoaded(true)}
                />
                {!isImgLoaded && (
                    <div className="BannerImgLoader1">
                        <Loading />
                    </div>
                )}
                <div className="SliderBanner_1">
                    <SliderItem
                        title={banner_data[0].title}
                        name={banner_data[0].name}
                        descript={banner_data[0].des}
                        btn="SHOP NOW"
                    />
                </div>
                <img
                    src={banner1_bg}
                    alt=""
                    fetchpriority="high"
                    className="BannerContainer_SubImg"
                />
            </div>
        </div>
    );
};

const HeroSlider2 = () => {
    const [isImgLoaded, setIsImgLoaded] = useState();

    return (
        <div className="SliderContainer">
            <div
                className="BannerContainer BannerContainer_2"
                title="Drag or swip to see other banner"
            >
                <img
                    src={''}
                    alt=""
                    lazysrc={banner2}
                    fetchpriority="low"
                    className="BannerContainer_MainImg BannerContainer_MainImg_2"
                    style={{ visibility: isImgLoaded ? 'visible' : 'hidden' }}
                    onLoad={() => setIsImgLoaded(true)}
                />
                {!isImgLoaded && (
                    <div className="BannerImgLoader2">
                        <Loading />
                    </div>
                )}
                <div className="SliderBanner_2">
                    <SliderItem
                        title={banner_data[1].title}
                        name={banner_data[1].name}
                        descript={banner_data[1].des}
                        btn="SHOP NOW"
                    />
                </div>
                <img
                    src={''}
                    alt=""
                    lazysrc={banner2_bg}
                    className="BannerContainer_SubImg"
                />
            </div>
        </div>
    );
};

const HeroSlider3 = () => {
    const [isImgLoaded, setIsImgLoaded] = useState();
    return (
        <div className="SliderContainer">
            <div
                className="BannerContainer BannerContainer_3"
                title="Drag or swip to see other banner"
            >
                <img
                    src={''}
                    alt={banner_data[2].name}
                    lazysrc={banner3}
                    fetchpriority="low"
                    className="BannerContainer_MainImg BannerContainer_MainImg_3"
                    style={{ visibility: isImgLoaded ? 'visible' : 'hidden' }}
                    onLoad={() => setIsImgLoaded(true)}
                />
                {!isImgLoaded && (
                    <div className="BannerImgLoader1">
                        <Loading />
                    </div>
                )}
                <div className="SliderBanner_3">
                    <SliderItem
                        title={banner_data[1].title}
                        name={banner_data[1].name}
                        descript={banner_data[1].des}
                        btn="SHOP NOW"
                    />
                </div>
            </div>
        </div>
    );
};

export default SliderBanner;
