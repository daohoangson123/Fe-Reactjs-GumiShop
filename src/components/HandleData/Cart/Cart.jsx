import emptyCart from '../../../assets/img/noitem.webp';
//
import { useDispatch, useSelector } from 'react-redux';
import { myCartSelector } from '../../../redux/Selectors/Selector';
import { removeInCart } from '../../../redux/Actions/Action';
//
import { Suspense, lazy, useState } from 'react';
//

const CartLayout = lazy(() => import('./CartLayout'));

const Cart = () => {
    const dispatch = useDispatch();
    const myCart = useSelector(myCartSelector);
    // eslint-disable-next-line
    const [quantity, setQuantity] = useState(1);

    const totalItem = myCart.length;

    const totalPrice =
        myCart &&
        myCart.reduce((sum, item) => sum + item.price * item.amount, 0);

    const saving =
        myCart &&
        myCart.reduce(
            (sum, item) => +(sum + item.discount * item.amount).toFixed(2),
            0,
        );

    const handleInc = (product) => {
        setQuantity((pre) => pre + product.amount++);
    };

    const handleDec = (product) => {
        setQuantity((pre) => pre + product.amount--);
    };

    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleRemove(product) {
        dispatch(removeInCart(product));
    }

    return (
        <section className='CartPage'>
            <Suspense>
                <CartLayout
                    myCart={myCart}
                    totalItem={totalItem}
                    totalPrice={totalPrice}
                    saving={saving}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleInc={handleInc}
                    handleDec={handleDec}
                    handleRemove={handleRemove}
                    handleSubmit={handleSubmit}
                    emptyCart={emptyCart}
                />
            </Suspense>
        </section>
    );
};

export default Cart;
