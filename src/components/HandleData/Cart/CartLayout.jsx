import './CartLayout.css';
//
import { Link } from 'react-router-dom';
//
import { Slide, toast } from 'react-toastify';

const CartForm = ({
    myCart,
    isSignIn,
    totalItem,
    totalPrice,
    saving,
    handleInc,
    handleDec,
    handleRemove,
    handleSubmit,
    emptyCart,
    purchasing,
}) => {
    return (
        <form className="Cart-Item_Form" onSubmit={handleSubmit}>
            {totalItem > 0 && totalItem ? (
                <>
                    <div className="Cart-Item-List Cart-Item-List-Header">
                        <div className="Cart-Item">
                            <div className="Cart-Item_Name">Product</div>
                            <div className="Cart-Item_Price">Price</div>
                            <div className="Cart-Item_Quantity">Quantity</div>
                            <div className="Cart-Item_Cost">Cost</div>
                        </div>
                    </div>
                    <div className="Cart__Layout">
                        <div className="Cart-Item-List">
                            {myCart.map((item, index) => {
                                const cost = item.amount * item.price;
                                const removeNotify = () =>
                                    toast.error(
                                        `${item.name} removed from your Cart`,
                                        {
                                            transition: Slide,
                                            position: 'bottom-center',
                                        }
                                    );
                                return (
                                    <div className="Cart-Item" key={item.id}>
                                        <Link
                                            to={
                                                item.color
                                                    ? `/wholesale/${item.id}`
                                                    : `/shop/${item.name
                                                          .split(' ')
                                                          .join('-')}`
                                            }
                                            className="Cart-Item-Link"
                                            title="Go to detail"
                                        >
                                            <div className="Cart-Item_Name">
                                                {item.name}
                                            </div>
                                        </Link>
                                        <div className="Cart-Item_Price">
                                            <span>Price: </span> ${item.price}
                                        </div>
                                        <div className="Cart-Item_Quantity">
                                            <button
                                                type="button"
                                                title="Decrease"
                                                onClick={() => {
                                                    if (item.amount > 1) {
                                                        handleDec(item);
                                                    } else {
                                                        window.alert(
                                                            '1 is minimum'
                                                        );
                                                    }
                                                }}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                title="Current quantity"
                                                name={`quantity${index}`}
                                                id={`quantity${index}`}
                                                value={item.amount}
                                                min={1}
                                                max={1000}
                                                disabled
                                                autoComplete="off"
                                            />
                                            <button
                                                type="button"
                                                title="Increase"
                                                onClick={() => {
                                                    if (
                                                        item.stock &&
                                                        item.amount < item.stock
                                                    ) {
                                                        handleInc(item);
                                                    } else if (!item.stock) {
                                                        handleInc(item);
                                                    } else {
                                                        window.alert(
                                                            `${item.stock} is maximum`
                                                        );
                                                    }
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="Cart-Item_Cost">
                                            <span>Cost: </span> ${cost}
                                        </div>
                                        <button
                                            className="Remove_Item"
                                            type="button"
                                            title="Remove item"
                                            onClick={() => {
                                                handleRemove({
                                                    id: item.id,
                                                });
                                                removeNotify();
                                            }}
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="Purchase-Check">
                            <div
                                style={{
                                    fontWeight: 600,
                                    fontSize: '24px',
                                    textAlign: 'center',
                                }}
                            >
                                Check-Out
                            </div>
                            <div className="Total-Item">
                                Total: {totalItem} Item{totalItem > 1 && 's'}
                            </div>
                            <div className="Total-Price">
                                <div>Total Cost: {totalPrice}</div>
                                <div>Saving: {saving}</div>
                            </div>
                            <button
                                className="Buy_Btn"
                                disabled={purchasing}
                                type="submit"
                                onSubmit={handleSubmit}
                            >
                                {!isSignIn ? (
                                    <Link
                                        to="/userSignIn"
                                        title="Please SignIn"
                                    >
                                        Sign In
                                    </Link>
                                ) : (
                                    <div title="Purchase">
                                        {purchasing ? (
                                            <i className="fa-solid fa-spinner fa-spin"></i>
                                        ) : (
                                            'Purchase'
                                        )}
                                    </div>
                                )}
                            </button>
                            <div
                                style={{
                                    textAlign: 'center',
                                    fontSize: '14px',
                                    color: 'red',
                                    marginTop: '10px',
                                }}
                            >
                                {!isSignIn && (
                                    <span>
                                        Your are not Sign In yet!
                                        <br />
                                        Please Sign In to make purchase.
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="EmptyCart">
                    <div className="ToShopLink">
                        <Link to="/shop" title="Shopping Now">
                            Shopping Now
                        </Link>
                    </div>
                    <img src={emptyCart} alt="EmptyCart"></img>
                </div>
            )}
        </form>
    );
};

export default CartForm;
