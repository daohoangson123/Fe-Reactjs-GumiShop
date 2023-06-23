import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
//
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/Actions/Action';
//
import { fetchProductApi } from '../../../data/axiosAPI/productData';
//
import ProductDetailLayout from './ProductDetailLayout';
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

        const findProductDetail = result.find(
            (product) =>
                product.name.split(' ').join('-') === id.split(' ').join('-'),
        );
        setProductDetail(findProductDetail);
    };

    useEffect(() => {
        setProductDetail([]);
        setTimeout(() => getProducts(), 1000);
    }, [id]);

    return (
        <div>
            <ProductDetailLayout
                productDetail={productDetail}
                quantity={quantity}
                setQuantity={setQuantity}
                handleAddToCart={handleAddToCart}
            />
        </div>
    );
};

export default ProductDetail;
