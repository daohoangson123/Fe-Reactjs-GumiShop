import './Cart.css';
//
import emptyCart from '../../../Assets/img/emptycart.png';
import removeItem from '../../../Assets/img/removeitem.png';
//
import { useDispatch, useSelector } from 'react-redux';
import { myCartSelector } from '../../../Redux/Selectors/Selector';
import { removeInCart } from '../../../Redux/Actions/Action';
import { useState } from 'react';

const CartForm = () => {
    const dispatch = useDispatch();
    const myCart = useSelector(myCartSelector);
    // eslint-disable-next-line
    const [quantity, setQuantity] = useState(1);

    const itemQuantity = myCart.length;

    const totalPrice =
        myCart &&
        myCart.reduce((sum, item) => sum + item.price * item.amount, 0);

    const saving =
        myCart &&
        myCart.reduce(
            (sum, item) => +(sum + item.discount * item.amount).toFixed(2),
            0,
        );

    const handleChange = (event, product) => {
        let newAmount = event.target.value;
        product.amount = newAmount;
        setQuantity(newAmount);
    };

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleRemove(product) {
        dispatch(removeInCart(product));
    }

    return (
        <form
            className='Cart-Item_Form container'
            onSubmit={handleSubmit}
        >
            <div className='Product-In-Cart'>
                You Have {}
                {itemQuantity} Product
                {itemQuantity < 2 ? null : 's'} In Cart
            </div>
            <div
                className='Cart__Layout'
                style={itemQuantity === 0 ? { display: 'block' } : null}
            >
                <div className='Cart-Item-List'>
                    {itemQuantity !== 0 ? (
                        myCart.map((item, index) => {
                            const cost = item.amount * item.price;
                            const saved =
                                Math.round(item.amount * item.discount * 100) /
                                100;
                            return (
                                <div
                                    className='Cart-Item'
                                    key={index}
                                >
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                    />
                                    <div className='Cart-Item_Name'>
                                        {item.name}
                                    </div>
                                    <div className='Cart-Item_Price'>
                                        <span>Price: {item.price}</span>
                                        <br />
                                        {item.discount !== 0 && (
                                            <span className='Discounted'>
                                                Discounted: {item.discount}
                                            </span>
                                        )}
                                    </div>
                                    <div className='Cart-Item_Quantity'>
                                        <label htmlFor={`quantity${index}`}>
                                            Quantity:{' '}
                                        </label>
                                        <button
                                            onClick={() => {
                                                if (item.amount > 1) {
                                                    setQuantity(
                                                        (amount) =>
                                                            amount +
                                                            item.amount--,
                                                    );
                                                }
                                            }}
                                        >
                                            -
                                        </button>
                                        <input
                                            type='number'
                                            name={`quantity${index}`}
                                            id={`quantity${index}`}
                                            min='1'
                                            max='100'
                                            value={item.amount}
                                            disabled
                                            onChange={(event) => {
                                                handleChange(event, item);
                                            }}
                                        />
                                        <button
                                            onClick={() => {
                                                if (item.amount < 100) {
                                                    setQuantity(
                                                        (amount) =>
                                                            amount +
                                                            item.amount++,
                                                    );
                                                }
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className='Cart-Item_Cost'>
                                        Cost: {cost}
                                        <br />
                                        Saving: {saved}
                                    </div>
                                    <button
                                        className='Remove_Item'
                                        type='button'
                                        onClick={() => {
                                            handleRemove({
                                                id: item.id,
                                            });
                                        }}
                                    >
                                        <img
                                            src={removeItem}
                                            alt='Remove'
                                        />
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <div className='EmptyCart'>
                            <img
                                src={emptyCart}
                                alt='EmptyCart'
                            ></img>
                        </div>
                    )}
                </div>
                {itemQuantity !== 0 && (
                    <div className='Purchase-Check'>
                        <div>Check-Out Form</div>
                        <div>
                            Total: {itemQuantity} Item{itemQuantity > 1 && 's'}
                        </div>
                        <div className='Total-Price'>
                            <div>Total Prices: {totalPrice}</div>
                            <div>Total Saving: {saving}</div>
                        </div>
                        <button
                            className='Buy_Btn'
                            type='submit'
                        >
                            Purchase
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};

const Cart = () => {
    return (
        <div className='Cart'>
            <CartForm />
        </div>
    );
};

export default Cart;
