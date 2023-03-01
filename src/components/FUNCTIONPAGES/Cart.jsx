import './Cart.css';
import { useSelector } from 'react-redux';
import { myCartSelector } from '../../REDUX/Selectors/Selector';
import { useState } from 'react';

const CartForm = ({...props}) => {
    const totalPrice = props.myCart && props.myCart.reduce((sum, item) => sum + (item.price * item.amount), 0);
    const [isPurchased, setIsPurchased] = useState(false);

    return (
        <form className='Cart-Item_Form' id='delayedForm'>
            <div className={ isPurchased ? 'Purchased' : 'NotPurchased' }>
                <div>
                    {props.myCart.length} Items Purchased!
                </div>
            </div>
            <div className='Product-Amount'>
                Product{props.myCart.length === 0 ? null : "s"} In Cart: {props.myCart.length}
            </div>
                {props.myCart.map((item) => {
                    const cost = item.amount * item.price;
                    return (<div className='Cart-Item' key={item.id}>
                        <img src={item.img} alt="" />
                        <div className='Cart-Item_Name'>{item.name}</div>
                        <span className='Cart-Item_Price'>Price: {item.price}</span>
                        <div className='Cart-Item_Quantity'>
                            <label htmlFor='quantity'>Quantity: </label>
                            <input type="number" value={item.amount} name="quantity" id="quantity"
                            onChange={(e) => {
                                props.handleChange(e,item)
                            }}/>
                        </div>
                        <div className='Cart-Item_Cost'>
                            Cost: {cost}
                        </div>
                    </div>)
                })}
                <div className='Total-Price'>
                    Total Prices: {totalPrice}
                </div>
                <div className='Buy_Btn-Container'>
                    <button className='Buy_Btn' disabled={props.myCart.length === 0 ? true : false} type='submit'
                    onClick={(e) => {
                        e.preventDefault();
                        setIsPurchased(true);
                        setTimeout(() => {
                            setIsPurchased(false)
                        }, 2000);
                        setTimeout(() => window.location.reload(), 2000);
                    }}
                    >
                        Purchase
                    </button>
                </div>
            </form>
    )
}


const Cart = () => {
    const myCart = useSelector(myCartSelector);
    const [quantity, setQuantity] = useState(1);

    const handleChange = (event, product) => {
        let newAmount = event.target.value;
        product.amount = Number(newAmount);
        setQuantity(event.target.value)
    }

    return (
        <div className='Cart'>
            <CartForm
            myCart={myCart}
            handleChange={handleChange}
            />
        </div>
    )
}

export default Cart;