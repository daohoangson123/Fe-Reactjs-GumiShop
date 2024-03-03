import './WholesaleProduct.css';
//
import brokenImg from '../../../../assets/img/brokenImg.png';
// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const WholesaleProduct = ({ props }) => {
    const [isImgError, setIsImgError] = useState(false);
    const orgPrice = props.price + props.discouter;
    const salePercent = 100 - (props.price / orgPrice) * 100;

    // useEffect(() => {
    //     function load(img) {
    //         const url = img.getAttribute('lazysrc');
    //         img.setAttribute('src', url);
    //     }

    //     const lazyImgs = document.querySelectorAll('[lazysrc]');
    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach((entry) => {
    //             if (entry.isIntersecting) {
    //                 load(entry.target);
    //             }
    //         });
    //     });

    //     lazyImgs.forEach((img) => {
    //         observer.observe(img);
    //     });

    //     return () => observer.disconnect();
    // }, []);

    return (
        <div className="WholesaleProduct" title={`Product: ${props.name}`}>
            <Link to={`/wholesale/${props._id}`}>
                <div className="WholesaleProduct__ImgContainer">
                    <img
                        className="WholesaleProduct__Img"
                        src={isImgError ? brokenImg : props.img}
                        alt={props.name}
                        // lazysrc={isImgError ? brokenImg : props.img}
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
