import './CartLayout.css';
//

const CartForm = ({
    myCart,
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
                                        }}>
                                        <i className='fa-solid fa-trash-can'></i>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <div className='Purchase-Check'>
                        <div>Check-Out Form</div>
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
                            Purchase
                        </button>
                    </div>
                </div>
            ) : (
                <div className='EmptyCart'>
                    <img
                        src={emptyCart}
                        alt='EmptyCart'></img>
                </div>
            )}
        </form>
    );
};

export default CartForm;
