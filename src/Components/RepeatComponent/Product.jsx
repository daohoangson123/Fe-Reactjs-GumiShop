import './Product.css';
//
import { useState } from 'react';
import { Link } from 'react-router-dom';
//
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Actions/Action';
import { removeInCart } from '../../Redux/Actions/Action';

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

    return (
        <div className='Product'>
            <div className='Product__Img-Container'>
                <img
                    src={props.url}
                    alt={props.name}
                />
                <div
                    className='AddToCart_Bg'
                    style={{ top: isAdded && 0 }}
                >
                    <Link
                        className='ProductLink'
                        to={`/product/${props.id}`}
                    >
                        Detail
                    </Link>
                    <button
                        className='AddToCart'
                        style={{
                            background: isAdded && '#F6623E',
                            borderRadius: isAdded && '100%',
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
                <span className='SalePrices'>
                    {'$' + props.saleprices + ' NZD'}
                </span>
                {props.prices === 0 ? null : (
                    <span className='Prices'>${props.prices} NZD</span>
                )}
            </div>
        </div>
    );
};

export default Product;
