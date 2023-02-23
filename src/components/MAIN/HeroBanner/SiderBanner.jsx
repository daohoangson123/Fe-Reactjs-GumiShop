import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import heroBanner1 from '../../../img/HeroBanner.png';
import heroBanner2 from '../../../img/HeroBanner1.png';
import ProductShop from '../../RepeatComponent/ProductShop';
import heroBannerBot from '../../../img/HeroBannerBot.png';
import './SliderBanner.css';

const banner_1 = {
        bgUrl: heroBanner1,
        title: "Good4Me",
        name: "Apple Cider Vinegar",
        des: "Good4Me Apple Cider Vinegar gummies are the newest addition to your morning health and well-being regime.",
    }

const banner_2 = {
        bgUrl: heroBanner2,
        title: "Good4Me",
        name: "MULTI-VITAMIN (3 MONTH SUPPLY)",
        des: "Good4Me Apple Cider Vinegar gummies are the newest addition to your morning health and well-being regime.",
    }

const SliderBanner = () => {

    return (
        <div>
            <OwlCarousel className='owl-theme' responsiveRefreshRate={0} autoplay={false} items={1} nav={false} dots={false} loop>
                <div className='SliderContainer'>
                    <div className='BannerContainer BannerContainer_1' style={{backgroundImage: `url(${banner_1.bgUrl})`}}>
                        <div className='SliderBanner_1' >
                            <ProductShop
                            title={banner_1.title}
                            name={banner_1.name}
                            des={banner_1.des}
                            btn="SHOP NOW"
                            />
                        </div>
                    <div className='Silder1Bot'>
                        <img src={heroBannerBot} alt="" />
                    </div>
                    </div>
                </div>
                <div className='SliderContainer'>
                    <div className='BannerContainer BannerContainer_2' style={{backgroundImage: `url(${banner_2.bgUrl})`}}>
                        <div className='SliderBanner_2'>
                            <ProductShop
                            title={banner_2.title}
                            name={banner_2.name}
                            des={banner_2.des}
                            btn="SHOP NOW"
                            />
                        </div>
                    </div>
                </div>
            </OwlCarousel>
        </div>
    )
}

export default SliderBanner;