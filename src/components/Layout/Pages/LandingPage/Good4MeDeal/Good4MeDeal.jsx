import './Good4MeDeal.css';
//
import { useEffect, useState } from 'react';
//
import { fetchProductApi } from '../../../../../data/axiosAPI/productData';
//
import Product from '../../../UI/Product/Product';
import Good4MeDealBot from './GoodDealBot/Good4MeDealBot';
//
import SectionTitle from '../../../UI/SectionTitle/SectionTitle';
import ProductSkeleton from '../../../UI/Skeleton/ProductSkeleton';

const Good4MeDeal = ({ tittle, content }) => {
    const [productApi, setProductApi] = useState([]);

    const getProducts = async () => {
        let result = await fetchProductApi();

        if (result) {
            setProductApi(result);
            setProductApi(result.slice(0, Math.ceil(result.length / 2)));
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <section className='Good4MeDeal Container hide'>
            <SectionTitle content={tittle} />
            <hr />
            <p>{content}</p>
            <div className='ProductContainer'>
                {productApi.length === 0 ? (
                    <ProductSkeleton />
                ) : (
                    productApi.map((product) => (
                        <div
                            className='ProductItem'
                            key={product._id}
                        >
                            <Product
                                id={product._id}
                                url={product.img}
                                name={product.name}
                                sale={product.sale}
                                prices={product.price}
                                saleprices={product.price / 2}
                            />
                        </div>
                    ))
                )}
            </div>
            <Good4MeDealBot />
        </section>
    );
};

export default Good4MeDeal;
