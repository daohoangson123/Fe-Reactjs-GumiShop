import emptyCart from '../../../assets/img/emptycart.png';
//
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    myCartSelector,
    signinSelector,
    userSelector,
} from '../../../redux/Selectors/Selector';
import {
    newDecAmount,
    newIncAmount,
    removeInCart,
    submitCart,
} from '../../../redux/Actions/Action';
//
import CartLayout from './CartLayout';
//
import ErrorBoundary from '../../Support/Error/ErrorBoundary';
//
import { Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { putPurchasedHistory } from '../../../data/axiosAPI/purchaseHistory';

const Cart = () => {
    const dispatch = useDispatch();
    const myCart = useSelector(myCartSelector);
    const isSignIn = useSelector(signinSelector);
    const userData = useSelector(userSelector);
    const [purchasing, setPurchasing] = useState(false);

    const purchasedDate = new Date();

    const purchasedNotify = () =>
        toast.success(`Your purchase was successful`, {
            transition: Zoom,
        });

    const totalItem = myCart.length;

    const totalPrice =
        myCart &&
        myCart.reduce((sum, item) => sum + item.price * item.amount, 0);

    const saving =
        myCart &&
        myCart.reduce(
            (sum, item) => +(sum + item.discount * item.amount).toFixed(2),
            0
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
            setTimeout(
                () =>
                    dispatch(
                        submitCart([
                            { ...userData, date: purchasedDate.toDateString() },
                            ...myCart,
                        ])
                    ),
                1500
            );
            setTimeout(
                () => putPurchasedHistory(userData.id, userData, myCart),
                1500
            );
        }
    }

    function handleRemove(product) {
        dispatch(removeInCart(product));
    }

    return (
        <div className="CartPage">
            <ErrorBoundary>
                <CartLayout
                    myCart={myCart}
                    isSignIn={isSignIn}
                    totalItem={totalItem}
                    totalPrice={totalPrice}
                    saving={saving}
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
