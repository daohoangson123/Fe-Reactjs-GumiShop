import './WholesaleProduct.css';
//
import brokenImg from '../../../../assets/img/brokenImg.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const WholesaleProduct = ({ props }) => {
    const [isImgLoaded, setIsImgLoaded] = useState();
    const [isImgError, setIsImgError] = useState(false);
    const orgPrice = props.price + props.discouter;
    const salePercent = 100 - (props.price / orgPrice) * 100;

    return (
        <div className="WholesaleProduct" title={`Product: ${props.name}`}>
            <Link to={`/wholesale/${props._id}`}>
                <div
                    className="WholesaleProduct__ImgContainer"
                    style={{ visibility: isImgLoaded ? 'visible' : 'hidden' }}
                >
                    <img
                        className="WholesaleProduct__Img"
                        src={isImgError ? brokenImg : props.img}
                        alt={props.name}
                        loading="lazy"
                        onLoad={() => setIsImgLoaded(true)}
                        onError={() => setIsImgError(true)}
                    />
                </div>
                <div className="WholesaleProduct__Content">
                    <div className="WholesaleProduct__Name">{props.name}</div>
                    <div className="WholesaleProduct__Price">
                        $ {props.price}
                    </div>
                    {props.discouter && props.discouter !== 0 ? (
                        <div>
                            <span className="WholesaleProduct__Discount">
                                $ {orgPrice}
                            </span>
                            <span>-{salePercent.toFixed()}%</span>
                        </div>
                    ) : null}
                </div>
            </Link>
        </div>
    );
};

export default WholesaleProduct;
