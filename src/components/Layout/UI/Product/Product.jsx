import { useEffect, useState } from 'react';
import './Product.css';
//
import { Link } from 'react-router-dom';
import lazyImgCall from '../../../../data/lazyImg';
//

const Product = (props) => {
    const [isImgLoaded, setIsImgLoaded] = useState();
    useEffect(() => {
        lazyImgCall();
    }, []);
    return (
        <div className="Product">
            <div
                className="Product__Img-Container"
                style={{ visibility: isImgLoaded ? 'visible' : 'hidden' }}
            >
                <img
                    src={''}
                    alt={isImgLoaded && props.name}
                    lazysrc={props.url}
                    onLoad={() => setIsImgLoaded(true)}
                />
                <div className="ProductLink_Bg">
                    <Link
                        title="Go to Product Detail"
                        to={`/shop/${props.name.split(' ').join('-')}`}
                        tabIndex="-1"
                    >
                        <i className="fa-solid fa-circle-info"></i>
                    </Link>
                    <i className="fa-solid fa-cart-shopping"></i>
                    <i className="fa-solid fa-heart"></i>
                </div>
                {props.sale && isImgLoaded ? (
                    <div className="Product__Sale" title="Product On Sale">
                        ON SALE
                    </div>
                ) : null}
            </div>
            <div className="Product__Name" style={props.style}>
                {props.name}
            </div>
            <div className="Product__Prices">
                <span className="SalePrices">${props.saleprices} NZD</span>
                <span className="Prices">
                    {props.prices !== 0 ? (
                        <span style={{ textDecoration: 'line-through' }}>
                            {props.prices} NZD
                        </span>
                    ) : (
                        <span style={{ textDecoration: 'none' }}>
                            Not on Sale
                        </span>
                    )}
                </span>
            </div>
        </div>
    );
};

export default Product;
