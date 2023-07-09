import { Link } from 'react-router-dom';
import './CartLayout.css';
//
import { Slide, toast } from 'react-toastify';

const CartForm = ({
    myCart,
    isSignIn,
    totalItem,
    totalPrice,
    saving,
    // setQuantity,
    handleInc,
    handleDec,
    handleRemove,
    handleSubmit,
    emptyCart,
}) => {
    return (
        <form
            className='Cart-Item_Form Container'
            onSubmit={handleSubmit}>
            {totalItem > 0 && totalItem ? (
                <div className='Cart__Layout'>
                    <div className='Cart-Item-List'>
                        {myCart.map((item, index) => {
                            const cost = item.amount * item.price;
                            const removeNotify = () =>
                                toast.error(
                                    `${item.name} removed from your Cart`,
                                    {
                                        transition: Slide,
                                        position: 'bottom-center',
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: false,
                                        draggable: true,
                                        progress: undefined,
                                        theme: 'light',
                                    },
                                );
                            return (
                                <div
                                    className='Cart-Item'
                                    key={item.id}>
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                    />
                                    <div className='Cart-Item_Name'>
                                        {item.name}
                                    </div>
                                    <div className='Cart-Item_Price'>
                                        <span>Price: ${item.price}</span>
                                    </div>
                                    <div className='Cart-Item_Quantity'>
                                        <label htmlFor={`quantity${index}`}>
                                            <i className='fa-solid fa-cubes-stacked'></i>
                                        </label>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                if (item.amount > 1) {
                                                    handleDec(item);
                                                } else {
                                                    window.alert(
                                                        '1 is minimun',
                                                    );
                                                }
                                            }}>
                                            -
                                        </button>
                                        <input
                                            type='number'
                                            name={`quantity${index}`}
                                            id={`quantity${index}`}
                                            value={item.amount}
                                            min={1}
                                            max={1000}
                                            disabled
                                            autoComplete='off'
                                            // onWheel={(event) =>
                                            //     event.target.blur()
                                            // }
                                            // onChange={(event) => {
                                            // if (
                                            //     newAmount < 1 ||
                                            //     newAmount > 1000
                                            // ) {
                                            //     return newAmount;
                                            // }
                                            // if (!isNaN(newAmount)) {
                                            //     item.amount = newAmount;
                                            // }
                                            // setQuantity(event.target.value);
                                            // }}
                                            // onInput={(event) =>
                                            //     (event.currentTarget.value =
                                            //         event.currentTarget.value
                                            //             .replace(/[^0-9.]/g, '')
                                            //             .replace(
                                            //                 /(\..*?)\..*/g,
                                            //                 '$1',
                                            //             )
                                            //             .replace(/^0[^.]/, '0'))
                                            // }
                                        />
                                        <button
                                            type='button'
                                            onClick={() => {
                                                if (item.amount < 1000) {
                                                    handleInc(item);
                                                } else {
                                                    window.alert(
                                                        '1000 is maximum',
                                                    );
                                                }
                                            }}>
                                            +
                                        </button>
                                    </div>
                                    <div className='Cart-Item_Cost'>
                                        Cost: ${cost}
                                    </div>
                                    <button
                                        className='Remove_Item'
                                        type='button'
                                        onClick={() => {
                                            handleRemove({
                                                id: item.id,
                                            });
                                            removeNotify();
                                        }}>
                                        <i className='fa-solid fa-trash-can'></i>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div
                        onSubmit={handleSubmit}
                        className='Purchase-Check'>
                        <div style={{ fontWeight: 600, fontSize: '24px' }}>
                            Check-Out
                        </div>
                        <div>
                            Total: {totalItem} Item{totalItem > 1 && 's'}
                        </div>
                        <div className='Total-Price'>
                            <div>Total Cost: {totalPrice}</div>
                            <div>Saving: {saving}</div>
                        </div>

                        <button
                            className='Buy_Btn'
                            type='submit'>
                            <abbr
                                title={!isSignIn ? 'SignIn first' : 'Purchase'}>
                                {!isSignIn ? (
                                    <Link to='/userSignIn'>Purchase</Link>
                                ) : (
                                    'Purchase'
                                )}
                            </abbr>
                        </button>
                        <div style={{ textAlign: 'center' }}>
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
            ) : (
                <div className='EmptyCart'>
                    <div className='ToShopLink'>
                        <abbr title='Shopping Now'>
                            <Link to='/shop'>Shopping Now</Link>
                        </abbr>
                    </div>
                    <img
                        src={emptyCart}
                        alt='EmptyCart'></img>
                </div>
            )}
        </form>
    );
};

export default CartForm;
