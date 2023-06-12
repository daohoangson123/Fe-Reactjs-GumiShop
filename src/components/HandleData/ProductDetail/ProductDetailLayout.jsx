import './ProductDetailLayout.css';
//
import Breadcrumbs from '../../Layout/UI/Breadcrumb/Breadcrumbs';
import Skeleton from 'react-loading-skeleton';
//

const ProductDetailLayout = ({
    productDetail,
    quantity,
    setQuantity,
    handleAddToCart,
}) => {
    return (
        <div className='ProductDetailLayout'>
            {productDetail.length === 0 ? (
                <div className='ProductDetailLayout__Box Container'>
                    <Skeleton className='ProductDetail__Breadcrumbs' />
                    <Skeleton
                        containerClassName='grid-container'
                        className='ProductDetail__Img'
                    />
                    <Skeleton
                        width={280}
                        count={6}
                    />
                </div>
            ) : (
                <>
                    <Breadcrumbs />
                    <div className='ProductDetailLayout__Box Container'>
                        <img
                            src={productDetail.img}
                            alt='productImg'
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
                        <div className='ProductDetailBox__AddToCart'>
                            <button
                                className='Quantity_Btn'
                                type='button'
                                onClick={() => {
                                    quantity > 10
                                        ? setQuantity((pre) => pre - 10)
                                        : setQuantity(1);
                                }}
                            ></button>
                            <button
                                className='Quantity_Btn'
                                type='button'
                                onClick={() => {
                                    quantity > 1 &&
                                        setQuantity((pre) => pre - 1);
                                }}
                            >
                                -
                            </button>
                            <input
                                className='Quantity_Input'
                                type='text'
                                name='quantity'
                                id='quantity'
                                value={quantity}
                                autoComplete='off'
                                onChange={(event) => {
                                    let newAmount = Math.round(
                                        event.target.value,
                                    );
                                    if (newAmount < 1) {
                                        newAmount = 1;
                                    } else if (!isNaN(newAmount)) {
                                        newAmount = Math.round(
                                            event.target.value,
                                        );
                                    }
                                    setQuantity(newAmount);
                                }}
                                onInput={(event) =>
                                    (event.currentTarget.value =
                                        event.currentTarget.value
                                            .replace(/[^0-9.]/g, '')
                                            .replace(/(\..*?)\..*/g, '$1')
                                            .replace(/^0[^.]/, '0'))
                                }
                            />
                            <button
                                className='Quantity_Btn'
                                type='button'
                                onClick={() => {
                                    setQuantity((pre) => pre + 1);
                                }}
                            >
                                +
                            </button>
                            <button
                                className='Quantity_Btn'
                                type='button'
                                onClick={() => {
                                    setQuantity((pre) => pre + 10);
                                }}
                            ></button>
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
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDetailLayout;
