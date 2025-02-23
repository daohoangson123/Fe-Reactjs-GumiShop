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
import { useState } from 'react';
import Loading from '../../../UI/Loading/Loading';
//

const SliderBanner = () => {
    return (
        <section className="HeroBanner">
            <OwlCarousel
                className="owl-theme"
                responsiveRefreshRate={0}
                items={1}
                dots
            >
                <HeroSlider
                    bannerNumber={1}
                    imgSrc={banner1_425}
                    imgAlt={banner_data[0].name}
                    imgSrcset={`${banner1_425} 1024w, ${banner1_1024} 1920w, ${banner1_1920} 2560w`}
                    sliderTitle={banner_data[0].title}
                    sliderName={banner_data[0].name}
                    sliderDes={banner_data[0].des}
                    subImgSrc={banner1_bg}
                />
                <HeroSlider
                    bannerNumber={2}
                    imgSrc={banner2}
                    imgAlt={banner_data[1].name}
                    sliderTitle={banner_data[1].title}
                    sliderName={banner_data[1].name}
                    sliderDes={banner_data[1].des}
                    subImgSrc={banner2_bg}
                />
                <HeroSlider
                    bannerNumber={3}
                    imgSrc={banner3}
                    imgAlt={banner_data[2].name}
                    imgSrcset={null}
                    sliderTitle={banner_data[2].title}
                    sliderName={banner_data[2].name}
                    sliderDes={banner_data[2].des}
                />
            </OwlCarousel>
        </section>
    );
};

const HeroSlider = ({
    bannerNumber,
    imgSrc,
    imgAlt,
    imgSrcset,
    sliderTitle,
    sliderName,
    sliderDes,
    subImgSrc,
}) => {
    const [isImgLoaded, setIsImgLoaded] = useState();

    return (
        <div className="SliderContainer">
            <div
                className={`BannerContainer BannerContainer_${bannerNumber}`}
                title="Drag or swip to see other banner"
            >
                <img
                    src={imgSrc}
                    alt={imgAlt}
                    srcSet={imgSrcset}
                    fetchpriority="high"
                    className={`BannerContainer_MainImg BannerContainer_MainImg_${bannerNumber}`}
                    onLoad={() => setIsImgLoaded(true)}
                />
                {!isImgLoaded && (
                    <div className={`BannerImgLoader${bannerNumber}`}>
                        <Loading />
                    </div>
                )}
                <div className={`SliderBanner_${bannerNumber}`}>
                    <SliderItem
                        title={sliderTitle}
                        name={sliderName}
                        descript={sliderDes}
                        btn="SHOP NOW"
                    />
                </div>
                <img
                    src={subImgSrc}
                    alt=""
                    fetchpriority="high"
                    className="BannerContainer_SubImg"
                />
            </div>
        </div>
    );
};

export default SliderBanner;
