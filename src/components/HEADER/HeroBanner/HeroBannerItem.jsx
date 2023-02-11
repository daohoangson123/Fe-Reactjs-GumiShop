import styled from 'styled-components';
import './HeroBannerItem.css';

export const BannerBtn = styled.button`
    background-color: #F6623E;
    max-width: 140px;
    max-height: 48px;
`

const HeroBannerItem = ({...props}) => {
    return (
        <div className='HeroBannerItem text-center md:text-left md:absolute xl:top-[150px] xl:right-[200px] md:max-w-[529PX] '>
            <h2 className='HeroBannerItem__Title '>{props.title}</h2>
            <h3 className='HeroBannerItem__ProductName'>{props.productname}</h3>
            <p className='HeroBannerItem__ProductDes'>{props.productdes}</p>
            <BannerBtn className=' text-white text-[12px] sm:text-[16px] mt-5 px-[5px] py-[2px] sm:px-[25px] sm:py-[13px] '>SHOP NOW</BannerBtn>
        </div>
    )
}

export default HeroBannerItem;