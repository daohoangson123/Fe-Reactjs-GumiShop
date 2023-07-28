import './ProductDetailLayout.css';
//
import Breadcrumbs from '../../Layout/UI/Breadcrumb/Breadcrumbs';
import Skeleton from 'react-loading-skeleton';
//
import { toast } from 'react-toastify';

const ProductDetailLayout = ({
    productDetail,
    quantity,
    setQuantity,
    handleAddToCart,
}) => {
    const addNotify = () =>
        toast.success(
            `${quantity + ' ' + productDetail.name} added to your Cart`,
            {
                position: 'bottom-right',
            },
        );

    return (
        <div className='ProductDetailLayout'>
            {productDetail.length === 0 ? (
                <>
                    <Skeleton className='ProductDetail__Breadcrumbs' />
                    <div className='ProductDetailLayout__Box ProductDetailLayoutSkeleton__Box Container'>
                        <Skeleton
                            containerClassName='grid-container'
                            className='ProductDetailSkeleton__Img'
                        />
                        <Skeleton
                            width={280}
                            count={6}
                        />
                    </div>
                </>
            ) : (
                <>
                    <Breadcrumbs />
                    <div className='ProductDetailLayout__Box Container'>
                        <img
                            src={productDetail.img}
                            alt='productImg'
                            className='ProductDetail__Img'
                        />
                        <div className='ProductDetailBox__Name'>
                            {productDetail.name}
                        </div>
                        <div className='ProductDetailBox__Rating'>
                            Rating: 4/5
                        </div>
                        <div className='ProductDetailBox__Stock'>In Stock</div>
                        <div className='ProductDetailBox__Price'>
                            <span>
                                Current Price: {productDetail.price} NZD
                            </span>
                            <br />
                            {productDetail.discouter !== 0 && (
                                <span>
                                    Saving: {productDetail.discouter} NZD
                                </span>
                            )}
                        </div>
                        <form className='ProductDetailBox__AddToCart'>
                            <button
                                className='Quantity_Btn'
                                type='button'
                                onClick={() => {
                                    quantity > 10
                                        ? setQuantity((pre) => pre - 10)
                                        : setQuantity(1);
                                }}></button>
                            <button
                                className='Quantity_Btn'
                                type='button'
                                onClick={() => {
                                    quantity > 1 &&
                                        setQuantity((pre) => pre - 1);
                                }}>
                                -
                            </button>
                            <input
                                className='Quantity_Input'
                                type='number'
                                name='quantity'
                                id='quantity'
                                min={1}
                                max={1000}
                                value={quantity}
                                autoComplete='off'
                                onWheel={(event) => event.target.blur()}
                                onChange={(event) => {
                                    let newAmount = Math.round(
                                        event.target.value,
                                    );
                                    if (newAmount < 1) {
                                        newAmount = 1;
                                    } else if (newAmount > 1000) {
                                        newAmount = 1000;
                                    } else if (!isNaN(newAmount)) {
                                        newAmount = Math.round(
                                            event.target.value,
                                        );
                                    }
                                    setQuantity(newAmount);
                                }}
                                // onInput={(event) =>
                                //     (event.currentTarget.value =
                                //         event.currentTarget.value
                                //             .replace(/[^0-9.]/g, '')
                                //             .replace(/(\..*?)\..*/g, '$1')
                                //             .replace(/^0[^.]/, '0'))
                                // }
                            />
                            <button
                                className='Quantity_Btn'
                                type='button'
                                onClick={() => {
                                    if (quantity < 1000) {
                                        setQuantity((pre) => pre + 1);
                                    }
                                }}>
                                +
                            </button>
                            <button
                                className='Quantity_Btn'
                                type='button'
                                onClick={() => {
                                    if (quantity < 991) {
                                        setQuantity((pre) => pre + 10);
                                    } else {
                                        setQuantity(1000);
                                    }
                                }}></button>
                            <button
                                className='AddToCart_Btn'
                                type='button'
                                onClick={() => {
                                    handleAddToCart({
                                        id: productDetail._id,
                                        img: productDetail.img,
                                        name: productDetail.name,
                                        price: productDetail.price,
                                        discount: productDetail.discouter,
                                        amount: quantity,
                                    });
                                    addNotify();
                                }}>
                                Add
                            </button>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDetailLayout;
