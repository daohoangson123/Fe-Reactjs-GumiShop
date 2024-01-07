import './SliderBanner.css';
//
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//
import { banner_1, banner_2 } from '../../../../../data/banner';
//
import banner_1bg from '../../../../../assets/img/HeroBanner.webp';
import banner_2bg from '../../../../../assets/img/HeroBanner1.webp';
//
import SliderItem from './SliderItem/SliderItem';
import { useState } from 'react';
//

const SliderBanner = () => {
    const [isBannerLoaded, setIsBannerLoaded] = useState(false);

    return (
        <section className='HeroBanner'>
            <div
                style={{
                    opacity: isBannerLoaded ? 1 : 0,
                    transition: '0.3s linear',
                }}
            >
                <OwlCarousel
                    className='owl-theme'
                    responsiveRefreshRate={0}
                    autoplay
                    autoplayHoverPause
                    // mouseDrag={false}
                    // touchDrag={false}
                    // pullDrag={false}
                    autoplaySpeed={4000}
                    autoplayTimeout={8000}
                    items={1}
                    nav={false}
                    dots={false}
                    loop
                >
                    <div className='SliderContainer'>
                        <div
                            className='BannerContainer BannerContainer_1'
                            title='Slider is stopping'
                        >
                            <img
                                src={banner_1bg}
                                alt=''
                                fetchpriority='high'
                                onLoad={() => setIsBannerLoaded(true)}
                            />
                            <div className='SliderBanner_1'>
                                <SliderItem
                                    title={banner_1.title}
                                    name={banner_1.name}
                                    descript={banner_1.des}
                                    btn='SHOP NOW'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='SliderContainer'>
                        <div
                            className='BannerContainer BannerContainer_2'
                            title='Slider is stopping'
                        >
                            <img
                                src={banner_2bg}
                                alt=''
                                fetchpriority='high'
                            />
                            <div className='SliderBanner_2'>
                                <SliderItem
                                    title={banner_2.title}
                                    name={banner_2.name}
                                    descript={banner_2.des}
                                    btn='SHOP NOW'
                                />
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
        </section>
    );
};

export default SliderBanner;
