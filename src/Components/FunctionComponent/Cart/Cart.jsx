import './Cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { myCartSelector } from '../../../Redux/Selectors/Selector';
import { removeInCart } from '../../../Redux/Actions/Action';
import { useEffect, useState } from 'react';

const CartForm = ({ ...props }) => {
    const dispatch = useDispatch();
    const myCart = useSelector(myCartSelector);

    const totalPrice =
        myCart &&
        myCart.reduce((sum, item) => sum + item.price * item.amount, 0);
    const [isPurchased, setIsPurchased] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setTimeout(() => {
            this.submit();
        }, 2500);
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
                Product
                {myCart.length === 0 ? null : 's'} In Cart: {myCart.length}
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
                                  alt=''
                              />
                              <div className='Cart-Item_Name'>{item.name}</div>
                              <span className='Cart-Item_Price'>
                                  Price: {item.price}
                              </span>
                              <div className='Cart-Item_Quantity'>
                                  <label htmlFor='quantity'>Quantity: </label>
                                  <input
                                      type='number'
                                      value={item.amount}
                                      name='quantity'
                                      id='quantity'
                                      onChange={(event) => {
                                          props.handleChange(event, item);
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
                    onClick={() => {
                        setIsPurchased(true);
                        setTimeout(() => {
                            setIsPurchased(false);
                        }, 2000);
                    }}
                >
                    Purchase
                </button>
            </div>
        </form>
    );
};

const Cart = () => {
    const [quantity, setQuantity] = useState(1);

    const handleChange = (event, product) => {
        let newAmount = event.target.value;
        product.amount = Math.ceil(Number(newAmount));
        setQuantity(event.target.value);
    };

    return (
        <div className='Cart'>
            <CartForm handleChange={handleChange} />
        </div>
    );
};

export default Cart;
