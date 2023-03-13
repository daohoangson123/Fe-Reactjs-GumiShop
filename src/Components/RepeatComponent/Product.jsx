import './Product.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Actions/Action';
import { useState } from 'react';

const Product = ({ ...props }) => {
    const dispatch = useDispatch();
    const [added, setAdded] = useState(false);
    function handleAddToCart(product) {
        if (!added) {
            dispatch(addToCart(product));
            setAdded(true);
        } else {
            setAdded(false);
        }
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
                    style={{ top: added ? 0 : null }}
                >
                    <button
                        className='AddToCart'
                        style={{
                            background: added ? '#F6623E' : null,
                            borderRadius: added ? '100%' : null,
                        }}
                        onClick={() =>
                            handleAddToCart({
                                id: props.id,
                                img: props.url,
                                name: props.name,
                                price: props.saleprices,
                                amount: 1,
                            })
                        }
                    >
                        {!added ? 'Add' : 'Added'}
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
                <span className='Prices'>
                    {props.prices === 0 ? null : '$' + props.prices + ' NZD'}
                </span>
            </div>
        </div>
    );
};

export default Product;
