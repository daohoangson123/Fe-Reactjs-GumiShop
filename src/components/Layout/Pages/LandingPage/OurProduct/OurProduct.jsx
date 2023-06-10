import './OurProduct.css';
//
import { useEffect, useState } from 'react';
//
import { fetchProductApi } from '../../../../../data/axiosAPI/productData';
//
import Loading from '../../../UI/Loading/Loading';
import Product from '../../../UI/Product/Product';
import SectionTitle from '../../../UI/SectionTitle/SectionTitle';
//

const OurProduct = ({ title }) => {
    const [productApi, setProductApi] = useState([]);

    const [load, setLoad] = useState([]);

    const loadmore = () => {
        if (load.length < productApi.length) {
            setLoad(productApi);
        } else {
            setLoad(productApi.slice(0, Math.ceil(productApi.length / 2)));
        }
    };

    const getProducts = async () => {
        let result = await fetchProductApi();

        if (result) {
            setProductApi(result);
            setLoad(result.slice(0, Math.ceil(result.length / 2)));
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <section className='OurProduct Container'>
            <SectionTitle content={title} />
            <div className='ProductContainer'>
                {load.length === 0 ? (
                    <Loading />
                ) : (
                    load.map((product) => (
                        <div
                            className='ProductItem'
                            key={product._id}
                        >
                            <Product
                                id={product._id}
                                url={product.img}
                                name={product.name}
                                sale={product.sale}
                                prices={product.discouter}
                                saleprices={product.price}
                                style={{
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                }}
                            />
                        </div>
                    ))
                )}
            </div>
            {load.length !== 0 && (
                <div
                    className='LoadMore'
                    onClick={loadmore}
                >
                    {load.length < productApi.length
                        ? 'VIEW ALL PRODUCTS'
                        : 'VIEW LESS PRODUCTS'}
                </div>
            )}
        </section>
    );
};

export default OurProduct;
