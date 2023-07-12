import emptyCart from '../../../assets/img/emptycart.png';
//
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    myCartSelector,
    signinSelector,
} from '../../../redux/Selectors/Selector';
import {
    newDecAmount,
    newIncAmount,
    removeInCart,
    submitCart,
} from '../../../redux/Actions/Action';
//
// import { useState } from 'react';
//
import CartLayout from './CartLayout';
//
import ErrorBoundary from '../../Support/Error/ErrorBoundary';
//
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const dispatch = useDispatch();
    const myCart = useSelector(myCartSelector);
    const isSignIn = useSelector(signinSelector);
    const [purchasing, setPurchasing] = useState(false);
    // eslint-disable-next-line
    // const [quantity, setQuantity] = useState(1);

    const purchasedNotify = () =>
        toast.success(`Your purchase was successful`, {
            transition: Bounce,
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

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
        dispatch(newIncAmount(product));
    };

    const handleDec = (product) => {
        dispatch(newDecAmount(product));
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (isSignIn) {
            setPurchasing(true);
            setTimeout(() => purchasedNotify(), 1000);
            setTimeout(() => dispatch(submitCart()), 1500);
        }
    }

    function handleRemove(product) {
        dispatch(removeInCart(product));
    }

    return (
        <div className='CartPage'>
            <ErrorBoundary>
                <CartLayout
                    myCart={myCart}
                    isSignIn={isSignIn}
                    totalItem={totalItem}
                    totalPrice={totalPrice}
                    saving={saving}
                    // quantity={quantity}
                    // setQuantity={setQuantity}
                    handleInc={handleInc}
                    handleDec={handleDec}
                    handleRemove={handleRemove}
                    handleSubmit={handleSubmit}
                    emptyCart={emptyCart}
                    purchasing={purchasing}
                />
            </ErrorBoundary>
        </div>
    );
};

export default Cart;
