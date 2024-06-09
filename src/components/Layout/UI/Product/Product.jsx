import './Product.css';
//
// eslint-disable-next-line
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//

const Product = (props) => {
    useEffect(() => {
        function load(img) {
            const url = img.getAttribute('lazysrc');
            img.setAttribute('src', url);
        }

        const lazyImgs = document.querySelectorAll('[lazysrc]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    load(entry.target);
                }
            });
        });

        lazyImgs.forEach((img) => {
            observer.observe(img);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="Product">
            <div className="Product__Img-Container">
                <img
                    src={props.url}
                    alt={props.name}
                    loading="lazy"
                    // lazysrc={props.url}
                    // style={{ backgroundColor: props.url }}
                />
                <div className="ProductLink_Bg">
                    <Link
                        className="ProductLink"
                        title="Go to Product Detail"
                        to={`/shop/${props.name.split(' ').join('-')}`}
                        tabIndex="-1"
                    >
                        Detail
                    </Link>
                </div>
                {props.sale ? (
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
