import heroBanner from '../../../img/HeroBanner.png';

import './HeroBanner.css'
import HeroBannerItem from './HeroBannerItem';
const HeroBanner = () => {
    return (
        <div className='HeroBanner flex'>
            <div className='HeroBanner__Slide relative'>
                <img src={heroBanner} alt="banner" className='HeroBanner__Img hidden sm:block '/>
                <HeroBannerItem
                title="Good4Me"
                productname="Apple Cider Vinegar"
                productdes="Good4Me Apple Cider Vinegar gummies are the newest addition to your morning health and well-being regime. "
                />
            </div>
        </div>
    )
}

export default HeroBanner;