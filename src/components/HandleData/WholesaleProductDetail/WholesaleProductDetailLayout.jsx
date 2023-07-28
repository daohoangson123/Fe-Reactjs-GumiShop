import Skeleton from 'react-loading-skeleton';
import './WholesaleProductDetailLayout.css';
//
import { Link } from 'react-router-dom';
//

const WholesaleProductDetailLayout = ({
    productDetail,
    quantity,
    setQuantity,
    curColor,
    setCurColor,
    handleAddToCart,
    orgPrice,
    salePercent,
    shipOpt,
    shipOption,
    setShipOption,
}) => {
    return (
        <div className='WholesaleProductDetailLayout Container'>
            {productDetail.name ? (
                <>
                    <ul className='WholesaleProductDetailLayout__Breadcrumb'>
                        <li>
                            <Link>{productDetail.categories}</Link>
                            <span> &gt;</span>
                        </li>

                        <li>
                            <Link>{productDetail.brand || 'No Brand'}</Link>
                            <span> &gt;</span>
                        </li>
                        <li>{productDetail.name}</li>
                    </ul>
                    <div className='WholesaleProductDetailLayout__Product-Container'>
                        <div className='Product-Container__Img'>
                            <img
                                src={productDetail.img}
                                alt={productDetail.name}
                            />
                            <div className='Product-Container__Img-Carousel'>
                                Preview img Carousel
                            </div>
                        </div>
                        <div className='Product-Container__Info'>
                            <div className='Product-Container__Info-Name'>
                                {productDetail.name}
                            </div>
                            <div className='Product-Container__Info-Rate'>
                                Rate: {productDetail.star}/5
                            </div>
                            <div className='Product-Container__Info-Brand'>
                                Brand:{' '}
                                <Link>{productDetail.brand || 'No brand'}</Link>
                            </div>
                            <div className='Product-Container__Info-Price'>
                                Price: {productDetail.price}
                                {productDetail.discouter &&
                                productDetail.discouter !== 0 ? (
                                    <div>
                                        <span className='WholesaleProduct__Discount'>
                                            $ {orgPrice}
                                        </span>
                                        <span>-{salePercent.toFixed()}%</span>
                                    </div>
                                ) : null}
                            </div>
                            {productDetail.store && (
                                <div className='Product-Container__Info-Stock'>
                                    Stock: {productDetail.store}
                                </div>
                            )}
                            <div className='Product-Container__Info-AddToCart'>
                                <div className='Product-Container__Info-Option'>
                                    {productDetail.size && (
                                        <div className='Product-Container__Info-Size'>
                                            Size: {productDetail.size}
                                        </div>
                                    )}
                                    {productDetail.color && (
                                        <>
                                            Color: {curColor}{' '}
                                            <span>
                                                {!curColor &&
                                                    'Please pick color'}
                                            </span>
                                            <ul
                                                className='Product-Container__Info-Color'
                                                style={{
                                                    borderBlock: curColor
                                                        ? '1px solid lime'
                                                        : '1px solid red',
                                                }}>
                                                {productDetail.color &&
                                                    productDetail.color.map(
                                                        (item) => (
                                                            <li
                                                                key={item}
                                                                onClick={() =>
                                                                    setCurColor(
                                                                        item,
                                                                    )
                                                                }
                                                                style={{
                                                                    minWidth:
                                                                        '30px',
                                                                    aspectRatio: 1,
                                                                    borderRadius:
                                                                        '100%',
                                                                    backgroundColor: `${item}`,
                                                                    border:
                                                                        curColor ===
                                                                            item &&
                                                                        '2px solid black',
                                                                }}></li>
                                                        ),
                                                    )}
                                            </ul>
                                        </>
                                    )}
                                </div>
                                <form
                                    className='Product-Container__Info-AddToCart-Form'
                                    onSubmit={(event) =>
                                        event.preventDefault()
                                    }>
                                    <button
                                        className=''
                                        type='button'
                                        onClick={() => {
                                            quantity > 1 &&
                                                setQuantity((pre) => pre - 1);
                                        }}>
                                        -
                                    </button>
                                    <input
                                        className=''
                                        type='number'
                                        name='quantity'
                                        id='quantity'
                                        min={1}
                                        max={
                                            productDetail.store &&
                                            productDetail.store
                                        }
                                        value={quantity}
                                        autoComplete='off'
                                        onWheel={(event) => event.target.blur()}
                                        onChange={(event) => {
                                            let newAmount = Math.round(
                                                event.target.value,
                                            ).toFixed(0);
                                            if (newAmount < 1) {
                                                newAmount = 1;
                                            } else if (
                                                newAmount > productDetail.store
                                            ) {
                                                newAmount = productDetail.store;
                                            }
                                            setQuantity(newAmount);
                                        }}
                                    />
                                    <button
                                        className=''
                                        type='button'
                                        onClick={() => {
                                            if (
                                                quantity < productDetail.store
                                            ) {
                                                setQuantity((pre) => pre + 1);
                                            } else if (!productDetail.store) {
                                                setQuantity((pre) => pre + 1);
                                            } else {
                                                window.alert('no more');
                                            }
                                        }}>
                                        +
                                    </button>
                                    <br />
                                    <button
                                        className=''
                                        type='button'>
                                        Buy Now
                                    </button>
                                    <button
                                        className=''
                                        type='button'
                                        onClick={() => {
                                            handleAddToCart({
                                                id: productDetail._id,
                                                img: productDetail.img,
                                                name: productDetail.name,
                                                price: productDetail.price,
                                                discount:
                                                    productDetail.discouter,
                                                size: productDetail.size,
                                                color:
                                                    productDetail.color &&
                                                    curColor,
                                                stock: productDetail.store,
                                                amount: quantity,
                                            });
                                        }}>
                                        Add
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className='Product-Container__Shipping-Info'>
                            <div className='Product-Container__Shipping-Info-Opt'>
                                Shipping from: {shipOption}
                                <select
                                    name='shippingOpt'
                                    id='shippingOpt'
                                    onChange={(event) =>
                                        setShipOption(event.target.value)
                                    }>
                                    {shipOpt.map((opt) => (
                                        <option
                                            value={opt.value}
                                            key={opt.label}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Skeleton className='WholesaleBreadcrumb__Skeleton' />
                    <div className='WholesaleProductDetailLayout__Product-Container'>
                        <div>
                            <Skeleton
                                width={280}
                                height={280}
                            />
                        </div>
                        <div>
                            <Skeleton
                                width={280}
                                height={40}
                            />
                            <Skeleton
                                width={100}
                                height={30}
                            />
                            <Skeleton
                                width={200}
                                height={30}
                            />
                            <Skeleton
                                width={100}
                                height={30}
                            />
                            <Skeleton
                                width={150}
                                height={30}
                            />
                            <Skeleton
                                width={250}
                                height={40}
                            />
                            <Skeleton
                                width={200}
                                height={30}
                            />
                            <Skeleton
                                width={200}
                                height={30}
                            />
                        </div>
                        <div>
                            <Skeleton
                                width={280}
                                height={350}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WholesaleProductDetailLayout;
