import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Redux/Actions/Action';
//
import { fetchProductApi } from '../../../Data/axiosAPI/productData';
//
import { useParams } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
//
const ProductDetailLayout = lazy(() => import('./ProductDetailLayout'));
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
        getProducts();

        if (productDetail.name !== undefined) {
            document.title = `Gumi Shopify - ${productDetail.name}`;
        } else {
            document.title = 'Gumi Shopify';
        }
    }, [productDetail.name]);

    return (
        <section>
            <Suspense>
                <ProductDetailLayout
                    productDetail={productDetail}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleAddToCart={handleAddToCart}
                />
            </Suspense>
        </section>
    );
};

export default ProductDetail;
