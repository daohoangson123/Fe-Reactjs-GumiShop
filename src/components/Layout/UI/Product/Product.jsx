import './Product.css';
//
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../redux/Actions/Action';
import { removeInCart } from '../../../../redux/Actions/Action';

const Product = ({ ...props }) => {
    const dispatch = useDispatch();

    const [isAdded, setIsAdded] = useState(false);

    function handleAddToCart(product) {
        if (!isAdded) {
            dispatch(addToCart(product));
            setIsAdded(true);
        }
    }

    function handleRemove(product) {
        dispatch(removeInCart(product));
    }

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
        <div className='Product'>
            <div className='Product__Img-Container'>
                <img
                    src={null}
                    alt=''
                    lazysrc={props.url}
                />
                <div
                    className='AddToCart_Bg'
                    style={{ top: isAdded && 0 }}
                >
                    <Link
                        className='ProductLink'
                        to={`/shop/${props.name.split(' ').join('-')}`}
                    >
                        Detail
                    </Link>
                    <button
                        className='AddToCart'
                        style={{
                            background: isAdded && 'var(--color-primary)',
                        }}
                        onClick={() => {
                            if (!isAdded) {
                                handleAddToCart({
                                    id: props.id,
                                    img: props.url,
                                    name: props.name,
                                    price: props.saleprices,
                                    discount: props.prices,
                                    amount: 1,
                                });
                            } else {
                                handleRemove({
                                    id: props.id,
                                });
                                setIsAdded(false);
                            }
                        }}
                    >
                        {!isAdded ? 'Add' : 'Added'}
                    </button>
                </div>
                {props.sale ? (
                    <div className='Product__Sale'>ON SALE</div>
                ) : null}
            </div>
            <div
                className='Product__Name'
                style={props.style}
            >
                {props.name}
            </div>
            <div className='Product__Prices'>
                <span className='SalePrices'>${props.saleprices} NZD</span>
                {props.prices === 0 ? null : (
                    <span className='Prices'>${props.prices} NZD</span>
                )}
            </div>
        </div>
    );
};

export default Product;
