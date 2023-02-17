import { Link } from 'react-router-dom';
import './ProductShop.css';

const ProductToShop = ({...props}) => {
    return (
        <div className="Product__Banner ">
            <div className="ProductBanner__Title">{props.title}</div>
            <div className="ProductBanner__Name">{props.name}</div>
            <p className="ProductBanner__Des">{props.des}</p>
            <Link to='/shop' className="Product__Btn">{props.btn}</Link>
        </div>
    )
}

export default ProductToShop;