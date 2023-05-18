import './Cart.css';
//
import { useDispatch, useSelector } from 'react-redux';
import { myCartSelector } from '../../../Redux/Selectors/Selector';
import { removeInCart } from '../../../Redux/Actions/Action';
import { useEffect, useState } from 'react';

const CartForm = () => {
    const dispatch = useDispatch();
    const myCart = useSelector(myCartSelector);
    const [isPurchased, setIsPurchased] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const totalPrice =
        myCart &&
        myCart.reduce((sum, item) => sum + +item.price * +item.amount, 0);

    const handleChange = (event, product) => {
        let newAmount = +event.target.value;
        product.amount = newAmount;
        setQuantity((preAmount) => preAmount + newAmount);
    };

    function handleSubmit(event) {
        event.preventDefault();
        setIsPurchased(true);
        setTimeout(() => {
            this.submit();
        }, 2000);
    }

    function handleRemove(product) {
        dispatch(removeInCart(product));
    }

    useEffect(() => {
        const submitForm = document.getElementById('delayedForm');
        submitForm.addEventListener('submit', handleSubmit);
    }, []);

    return (
        <form
            className='Cart-Item_Form container'
            id='delayedForm'
        >
            <div className={isPurchased ? 'Purchased' : 'NotPurchased'}>
                <div className='Purchased__Notify'>
                    {myCart.length} Items Purchased!
                    <br />
                    Total Prices: {totalPrice}
                </div>
            </div>
            <div className='Product-In-Cart'>
                You Have {}
                {myCart.length} Product
                {myCart.length === 0 ? null : 's'} In Cart
                <div>
                    Note: item's minimum quantity must be 1 and maximum is 1000
                </div>
            </div>
            <div className='Cart__Layout'>
                <div className='Cart-Item-List'>
                    {myCart &&
                        myCart.map((item, index) => {
                            const cost = +item.amount * +item.price;
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
                                    <span className='Cart-Item_Price'>
                                        Price: {+item.price}
                                    </span>
                                    <div className='Cart-Item_Quantity'>
                                        <label htmlFor={`quantity${index}`}>
                                            Quantity:{' '}
                                        </label>
                                        <input
                                            type='number'
                                            name={`quantity${index}`}
                                            id={`quantity${index}`}
                                            min='1'
                                            max='1000'
                                            value={+item.amount}
                                            onChange={(event) => {
                                                handleChange(event, item);
                                            }}
                                        />
                                    </div>
                                    <div className='Cart-Item_Cost'>
                                        Cost: {cost}
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
                                        Remove Item
                                    </button>
                                </div>
                            );
                        })}
                </div>
                <div className='Purchase-Check'>
                    <div className='Total-Price'>
                        Total Prices: {totalPrice}
                    </div>
                    <button
                        className='Buy_Btn'
                        disabled={myCart.length === 0 ? true : false}
                        type='submit'
                    >
                        Purchase
                    </button>
                </div>
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
