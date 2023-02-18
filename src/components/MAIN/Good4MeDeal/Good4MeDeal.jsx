import Product from "../../RepeatComponent/Product";
import './Good4MeDeal.css';
import Good4MeDealBot from "./Good4MeDealBot";
import { useEffect, useState } from "react";

const Good4MeDeal = ({...props}) => {
    const [api, setApi] = useState([]);

    const data = api.slice(4, 8);
    
    useEffect(() => {
        (async function () {
            let fetchAPI = await fetch ("https://fe21-db.vercel.app/gummi");
            let fetchedAPI = await fetchAPI.json();
            let results = fetchedAPI;
            setApi([...results]);
        })();
    }, []);

    return (
        <section className="Good4MeDeal">
            <h2>GOOD4ME DEAL</h2>
            <hr />
            <p>Pick your beauty products today. 50% OFF on the most popular GOOD4ME. Order all classy products today!</p>
            <div className="ProductContainer">
                {data.map((product) => (
                    <div className="ProductItem" key={product.name}>
                        <Product
                        url={product.img}
                        name={product.name}
                        sale={product.sale}
                        prices={product.price}
                        saleprices={product.price / 2}
                    />
                    </div>
                ))}
            </div>
            <Good4MeDealBot />
        </section>
    )
}

export default Good4MeDeal;