import './SliderBanner.css';
//
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//
import bg1 from '../../../../../assets/img/HeroBanner.webp';
import bg2 from '../../../../../assets/img/HeroBanner1.webp';
//
import { banner_1, banner_2 } from '../../../../../data/banner';
//
import SliderItem from './SliderItem/SliderItem';
//

const SliderBanner = () => {
    return (
        <article className='SilderBanner'>
            <OwlCarousel
                className='owl-theme'
                responsiveRefreshRate={0}
                // autoplay
                autoplayHoverPause
                autoplaySpeed={3000}
                autoplayTimeout={4000}
                items={1}
                nav={false}
                dots={false}
                loop
            >
                <div className='SliderContainer'>
                    <div className='BannerContainer BannerContainer_1'>
                        <img
                            className='Img_as_Background1'
                            src={bg1}
                            alt='bg'
                        />
                        <div className='emptyContent'></div>
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
                    <div className='BannerContainer BannerContainer_2'>
                        <img
                            className='Img_as_Background2'
                            src={bg2}
                            alt='bg'
                        />
                        <div className='SliderBanner_2'>
                            <SliderItem
                                title={banner_2.title}
                                name={banner_2.name}
                                descript={banner_2.des}
                                btn='SHOP NOW'
                            />
                        </div>
                        <div className='emptyContent'></div>
                    </div>
                </div>
            </OwlCarousel>
        </article>
    );
};

export default SliderBanner;
