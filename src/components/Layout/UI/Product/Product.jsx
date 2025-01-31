import { useEffect, useState } from 'react';
import './Product.css';
//
import { Link } from 'react-router-dom';
import lazyImgCall from '../../../../data/lazyImg';
import Loading from '../Loading/Loading';
//

const Product = (props) => {
    const [isImgLoaded, setIsImgLoaded] = useState();
    useEffect(() => {
        lazyImgCall();
    }, []);
    return (
        <div className="Product">
            <Link
                title="Go to Product Detail"
                to={`/shop/${props.name.split(' ').join('-')}`}
                tabIndex="-1"
            >
                <div className="Product__Img-Container">
                    <div
                        style={{
                            gridArea: '1 / 1 / 2 / 1',
                            display: isImgLoaded && 'none',
                        }}
                    >
                        {!isImgLoaded && <Loading />}
                    </div>
                    <div
                        style={{
                            visibility: isImgLoaded ? 'visible' : 'hidden',
                            gridArea: '1 / 1 / 1 / 1',
                        }}
                    >
                        <img
                            src={''}
                            alt={isImgLoaded && props.name}
                            lazysrc={props.url}
                            onLoad={() => setIsImgLoaded(true)}
                        />
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
            </Link>
        </div>
    );
};

export default Product;
