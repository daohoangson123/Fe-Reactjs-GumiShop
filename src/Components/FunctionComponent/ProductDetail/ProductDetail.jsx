import './ProductDetail.css';
//
import { useParams } from 'react-router-dom';
//
import { useEffect, useState } from 'react';
//
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Redux/Actions/Action';
//
import { fetchProductApi } from '../../../Data/productData';
//

const ProductDetail = () => {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    function handleAddToCart(product) {
        dispatch(addToCart(product));
    }

    const getProducts = async () => {
        let result = await fetchProductApi();

        if (result) {
            const findProductDetail = result.find(
                (product) => product._id.toString() === id.toString(),
            );
            setProductDetail(findProductDetail);
        }
    };

    useEffect(() => {
        getProducts();
    });

    return (
        <div
            className='ProductDetail'
            style={
                productDetail.length === 0
                    ? {
                          textAlign: 'center',
                          backgroundColor: 'white',
                      }
                    : null
            }
        >
            {productDetail.length === 0 ? (
                <div className='WaitAPI'>
                    Loading Products... Please Wait A Second
                    <div className='WaitAPI__LoadingAnimation'></div>
                </div>
            ) : (
                <div className='ProductDetail__Layout'>
                    <img
                        src={productDetail.img}
                        alt='productImg'
                    />
                    <div className='ProductDetail__Name'>
                        {productDetail.name}
                    </div>
                    <div className='ProductDetail__Description'>
                        Description: Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Rerum qui vel molestias aspernatur
                        omnis saepe impedit laboriosam, soluta laudantium
                        doloremque! Amet dolores maiores possimus veniam ea quas
                        hic aperiam modi!
                    </div>
                    <div className='ProductDetail__Rating'>Rating: 4/5</div>
                    <div className='ProductDetail__Stock'>In Stock</div>
                    <div className='ProductDetail__Price'>
                        <span>Current Price: {productDetail.price} NZD</span>
                        <br />
                        {productDetail.discouter !== 0 && (
                            <span>Saving: {productDetail.discouter} NZD</span>
                        )}
                    </div>
                    <div className='ProductDetail__AddToCart'>
                        <button
                            className='Quantity_Btn'
                            type='button'
                            onClick={() => {
                                quantity > 1 &&
                                    setQuantity((preamount) => preamount - 1);
                            }}
                        >
                            -
                        </button>
                        <input
                            className='Quantity_Input'
                            type='number'
                            name='quantity'
                            id='quantity'
                            min='1'
                            max='100'
                            value={quantity}
                            disabled
                        />
                        <button
                            className='Quantity_Btn'
                            type='button'
                            onClick={() => {
                                quantity < 100 &&
                                    setQuantity((preamount) => preamount + 1);
                            }}
                        >
                            +
                        </button>
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
            )}
        </div>
    );
};

export default ProductDetail;
