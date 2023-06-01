import './ShopAll.css';
//
import Product from '../../../RepeatComponent/Product';
import Loading from '../../../SupportComponent/Loading/Loading';
//
import { useEffect, useState } from 'react';
//

const ShopAll = () => {
    const [productApi, setProductApi] = useState([]);

    const [loadMore, setLoadMore] = useState(0);

    let productLength = productApi.length;

    const load = productApi.toSpliced(
        productLength / 2 + loadMore,
        productLength,
    );

    useEffect(() => {
        (async function () {
            let fetchAPI = await fetch('https://fe21-db.vercel.app/gummi');
            let fetchedAPI = await fetchAPI.json();
            let results = fetchedAPI;
            setProductApi(results);
        })();
    }, []);

    return (
        <section className='OurProduct container'>
            <h2>SHOP ALL</h2>
            {productLength === 0 ? (
                <Loading />
            ) : (
                <>
                    <div className='ProductContainer'>
                        {load.map((product) => (
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
                        }}
                    >
                        {loadMore < productLength / 2
                            ? 'Load more'
                            : 'Show less'}
                    </div>
                </>
            )}
        </section>
    );
};

export default ShopAll;
