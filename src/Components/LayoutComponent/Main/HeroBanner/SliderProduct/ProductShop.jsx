import './ProductShop.css';
//
import { Link } from 'react-router-dom';

const ProductToShop = ({ ...props }) => {
    return (
        <div className='Product__Banner '>
            <div className='ProductBanner__Title'>{props.title}</div>
            <div className='ProductBanner__Name'>{props.name}</div>
            <p className='ProductBanner__Des'>{props.des}</p>
            <div className='Product__Btn'>
                <Link to='/shop'>{props.btn}</Link>
            </div>
        </div>
    );
};

export default ProductToShop;
