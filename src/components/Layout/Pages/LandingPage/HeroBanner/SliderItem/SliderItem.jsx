import './SliderItem.css';
//
import { Link } from 'react-router-dom';

const SliderItem = ({ title, name, descript, btn }) => {
    return (
        <div className='Product__Banner'>
            <div className='ProductBanner__Title'>{title}</div>
            <div className='ProductBanner__Name'>{name}</div>
            <p className='ProductBanner__Des'>{descript}</p>
            <Link
                to='/shop'
                className='Product__Btn'
                title='To Shop'
                tabIndex='-1'>
                {btn}
            </Link>
        </div>
    );
};

export default SliderItem;
