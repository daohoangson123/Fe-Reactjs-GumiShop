import './Good4MeDeal.css';
//
import Product from '../../../../RepeatComponent/Product';
import Good4MeDealBot from '../GoodDealBot/Good4MeDealBot';
import Loading from '../../../../SupportComponent/Loading/Loading';
//
import { useEffect, useState } from 'react';

const Good4MeDeal = () => {
    const [productApi, setProductApi] = useState([]);

    const data = productApi.slice(4, 8);

    useEffect(() => {
        async function getAPI() {
            let fetchAPI = await fetch('https://fe21-db.vercel.app/gummi');
            let fetchedAPI = await fetchAPI.json();
            let results = fetchedAPI;
            setProductApi(results);
        }

        getAPI();
    }, []);

    return (
        <section className='Good4MeDeal container'>
            <h2>GOOD4ME DEAL</h2>
            <hr />
            <p>
                Pick your beauty products today. 50% OFF on the most popular
                GOOD4ME. Order all classy products today!
            </p>
            {productApi.length === 0 ? (
                <Loading />
            ) : (
                <div className='ProductContainer'>
                    {data.map((product) => (
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
                    ))}
                </div>
            )}
            <Good4MeDealBot />
        </section>
    );
};

export default Good4MeDeal;
