import './ShopAll.css';
//
import { useEffect, useState } from 'react';
//
import { fetchProductApi } from '../../../../../data/axiosAPI/productData';
//
import Product from '../../../UI/Product/Product';
import SectionTitle from '../../../UI/SectionTitle/SectionTitle';
import ProductSkeleton from '../../../UI/Skeleton/ProductSkeleton';
//

const ShopAll = ({ title }) => {
    const [productApi, setProductApi] = useState([]);

    const [loadMore, setLoadMore] = useState(0);

    let productLength = productApi.length;

    const getProducts = async () => {
        let result = await fetchProductApi();

        if (result) {
            setProductApi(result);
        }
    };

    useEffect(() => {
        const sectCheck = document.querySelectorAll('.ShopAll');

        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    getProducts();
                    observer.unobserve(entry.target);
                }
            });
        });

        sectCheck.forEach((item) => {
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        function load(item) {
            item.classList.add('animated-fade-in');
        }

        const animated = document.querySelectorAll('.ShopAll * .ProductItem');

        let options = {
            rootMargin: '0px',
            threshold: 0.5,
        };

        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    load(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        animated.forEach((item) => {
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, [productApi, loadMore]);

    return (
        <section className='ShopAll Container'>
            <SectionTitle content={title} />
            {productLength === 0 ? (
                <div className='ProductContainer'>
                    <ProductSkeleton />
                </div>
            ) : (
                <>
                    <div className='ProductContainer'>
                        {productApi
                            .toSpliced(
                                productLength / 2 + loadMore,
                                productLength,
                            )
                            .map((product, index) => (
                                <div
                                    className='ProductItem'
                                    key={product._id}
                                    style={{
                                        animationDelay: `${
                                            index < 4 ? index * 0.2 : 0
                                        }s`,
                                    }}>
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
                            ))}
                    </div>
                    <div
                        className='LoadMore'
                        onClick={() => {
                            if (loadMore < productLength / 2) {
                                setLoadMore((pre) => pre + 1);
                            } else {
                                setLoadMore(0);
                            }
                        }}>
                        {loadMore < productLength / 2
                            ? 'SHOW MORE'
                            : 'SHOW LESS'}
                    </div>
                </>
            )}
        </section>
    );
};

export default ShopAll;
