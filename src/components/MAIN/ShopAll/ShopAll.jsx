import './ShopAll.css';

import Product from '../../RepeatComponent/Product';
import { useEffect, useState } from 'react';

const ShopAll = () => {
    const [api, setApi] = useState([]);

    const fisrtLoad = api.slice(0, 0);

    const fullLoad = api.slice(0, 4);
    
    const [load, setLoad] = useState(fisrtLoad);

    const [isCLicked, setIsClicked] = useState("VIEW ALL PRODUCTS");

    const loadmore = () => {
        if (load.length === 0) {
            setLoad(fullLoad);
            setIsClicked("VIEW LESS PRODUCTS");
        } else if (load.length !== 0) {
            setLoad(fisrtLoad);
            setIsClicked("VIEW ALL PRODUCTS");
        } 

    }
    
    useEffect(() => {
        (async function () {
            let fetchAPI = await fetch ("https://fe21-db.vercel.app/gummi");
            let fetchedAPI = await fetchAPI.json();
            let results = fetchedAPI;
            setApi([...results]);
        })();
    }, []);
    
    return (
        <section className='OurProduct container'>
            <h2>SHOP ALL</h2>
            {api.length === 0
                ? <div className='Loading'>Loading Products...</div>
                : null
            }
            <div className="ProductContainer">
                {api.slice(4, 8).map((product) => (
                    <div className="ProductItem" key={product._id}>
                        <Product
                        id={product._id}
                        url={product.img}
                        name={product.name}
                        sale={product.sale}
                        prices={product.discouter}
                        saleprices={product.price}
                        style={{fontSize: "14px", lineHeight: "20px"}}
                        />
                    </div>
                    ))
                }
                {load.map((product) => (
                    <div className="ProductItem" key={product._id}>
                        <Product
                        id={product._id}
                        url={product.img}
                        name={product.name}
                        sale={product.sale}
                        prices={product.discouter}
                        saleprices={product.price}
                        style={{fontSize: "14px", lineHeight: "20px"}}
                        />
                    </div>
                    ))
                }
            </div>
            <div className="LoadMore"
                onClick={loadmore}
                >
                    {isCLicked}
            </div>
        </section>
    )
}

export default ShopAll;