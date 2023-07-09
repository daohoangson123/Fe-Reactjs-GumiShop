import './Product.css';
//
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../redux/Actions/Action';
import { removeInCart } from '../../../../redux/Actions/Action';
//
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({ ...props }) => {
    const dispatch = useDispatch();

    const [isAdded, setIsAdded] = useState(false);

    const addNotify = () =>
        toast.success(`1 ${props.name} added to your Cart`, {
            position: 'bottom-right',
            transition: Zoom,
            autoClose: 1500,
            hideProgressBar: false,
            pauseOnHover: false,
            closeButton: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

    const removeNotify = () =>
        toast.error(`${props.name} removed from your Cart`, {
            position: 'bottom-right',
            autoClose: 1500,
            hideProgressBar: false,
            pauseOnHover: false,
            closeButton: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

    function handleAddToCart(product) {
        if (!isAdded) {
            dispatch(addToCart(product));
            setIsAdded(true);
        }
        addNotify();
    }

    function handleRemove(product) {
        dispatch(removeInCart(product));
        removeNotify();
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
                    style={{ top: isAdded && 0 }}>
                    <abbr title='Go to Product Detail'>
                        <Link
                            className='ProductLink'
                            to={`/shop/${props.name.split(' ').join('-')}`}>
                            Detail
                        </Link>
                    </abbr>
                    <abbr
                        title={
                            isAdded
                                ? 'Remove Product from Cart'
                                : 'Add Product to Cart'
                        }>
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
                            }}>
                            {!isAdded ? 'Add' : 'Remove'}
                        </button>
                    </abbr>
                </div>
                {props.sale ? (
                    <div className='Product__Sale'>
                        <abbr title='Product On Sale'>ON SALE</abbr>
                    </div>
                ) : null}
            </div>
            <div
                className='Product__Name'
                style={props.style}>
                {props.name}
            </div>
            <div className='Product__Prices'>
                <span className='SalePrices'>${props.saleprices} NZD</span>
                <span className='Prices'>
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
