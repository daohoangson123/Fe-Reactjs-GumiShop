import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './SliderBanner.css';
//
import { banner_1, banner_2 } from '../../../../../Data/banner';
//
import ProductShop from '../SliderProduct/ProductShop';
//

const SliderBanner = () => {
    return (
        <article className='SilderBanner'>
            <OwlCarousel
                className='owl-theme'
                responsiveRefreshRate={0}
                autoplay
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
                        <div className='SliderBanner_1'>
                            <ProductShop
                                title={banner_1.title}
                                name={banner_1.name}
                                des={banner_1.des}
                                btn='SHOP NOW'
                            />
                        </div>
                    </div>
                </div>
                <div className='SliderContainer'>
                    <div className='BannerContainer BannerContainer_2'>
                        <div className='SliderBanner_2'>
                            <ProductShop
                                title={banner_2.title}
                                name={banner_2.name}
                                des={banner_2.des}
                                btn='SHOP NOW'
                            />
                        </div>
                    </div>
                </div>
            </OwlCarousel>
        </article>
    );
};

export default SliderBanner;
