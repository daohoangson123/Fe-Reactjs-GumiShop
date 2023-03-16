import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { myCartSelector } from '../../../Redux/Selectors/Selector';
import { removeInCart } from '../../../Redux/Actions/Action';
import { useEffect, useState } from 'react';

const CartForm = () => {
    const dispatch = useDispatch();
    const myCart = useSelector(myCartSelector);

    const [quantity, setQuantity] = useState(1);

    const handleChange = (event, product) => {
        let newAmount = event.target.value;
        product.amount = Math.ceil(Number(newAmount));
        setQuantity(event.target.value);
    };

    const totalPrice =
        myCart &&
        myCart.reduce((sum, item) => sum + item.price * item.amount, 0);
    const [isPurchased, setIsPurchased] = useState(false);

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
    });

    return (
        <form
            className='Cart-Item_Form'
            id='delayedForm'
        >
            <div className={isPurchased ? 'Purchased' : 'NotPurchased'}>
                <div className='Purchased__Notify'>
                    {myCart.length} Items Purchased!
                </div>
            </div>
            <div className='Product-Amount'>
                {myCart.length} Product
                {myCart.length === 0 ? null : 's'} In Cart
                <div>
                    Note: item's minimum quantity is 1, if you remove it the
                    item will be remove from cart
                </div>
            </div>
            {myCart
                ? myCart.map((item, index) => {
                      const cost = item.amount * item.price;
                      return (
                          <div
                              className='Cart-Item'
                              key={index}
                          >
                              <img
                                  src={item.img}
                                  alt={item.name}
                              />
                              <div className='Cart-Item_Name'>{item.name}</div>
                              <span className='Cart-Item_Price'>
                                  Price: {item.price}
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
                                      value={item.amount}
                                      onChange={(event) => {
                                          handleChange(event, item);
                                      }}
                                  />
                              </div>
                              <div className='Cart-Item_Cost'>Cost: {cost}</div>
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
                  })
                : null}
            <div className='Total-Price'>Total Prices: {totalPrice}</div>
            <div className='Buy_Btn-Container'>
                <button
                    className='Buy_Btn'
                    disabled={myCart.length === 0 ? true : false}
                    type='submit'
                >
                    Purchase
                </button>
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
