import './OurProduct.css';
import p1 from '../../../img/product1.png';
import p4 from '../../../img/product4.png';
import Product from '../../RepeatComponent/Product';
import { useState } from 'react';

const products_List = [
    {
        id: 1,
        url: p1,
        name: "MULTI-VITAMIN (3 MONTH SUPPLY)",
        sale: true,
        prices: "$199.75 NZD",
        saleprices: "$39.95 NZD",
    },
    {
        id: 2,
        url: p4,
        name: "APPLE CIDER VINEGAR (3 MONTH SUPPLY)",
        sale: true,
        prices: "$199.75 NZD",
        saleprices: "$94.95 NZD",
    },
    {
        id: 3,
        url: p1,
        name: "MULTI-VITAMIN (3 MONTH SUPPLY)",
        sale: false,
        prices: "$199.75 NZD",
        saleprices: "$39.95 NZD",
    },
    {
        id: 4,
        url: p4,
        name: "APPLE CIDER VINEGAR (3 MONTH SUPPLY)",
        sale: true,
        prices: "$199.75 NZD",
        saleprices: "$94.95 NZD",
    },
]

const OurProduct = () => {
    const fisrtLoad = products_List.slice(0,3);

    const fullLoad = products_List;
    
    const [load, setLoad] = useState(fisrtLoad);

    const [isCLicked, setIsClicked] = useState("VIEW ALL PRODUCTS");

    const loadmore = () => {
        if (load === fisrtLoad) {
            setLoad(fullLoad);
            setIsClicked("VIEW LESS PRODUCTS");
        } else if (load === fullLoad) {
            setLoad(fisrtLoad);
            setIsClicked("VIEW ALL PRODUCTS");
        } else if (load !== fisrtLoad) {
            setLoad(fullLoad);
            setIsClicked("VIEW LESS PRODUCTS");
        } else if (load !== fullLoad) {
            setLoad(fisrtLoad);
            setIsClicked("VIEW ALL PRODUCTS");
        }
    }
    

    return (
        <div className='OurProduct'>
            <h2>OUR PRODUCTS ARE</h2>
            <div className="ProductContainer">
                {load.map((product) => (
                    <div className="ProductItem" key={product.id}>
                        <Product
                        url={product.url}
                        name={product.name}
                        sale={product.sale}
                        prices={product.prices}
                        saleprices={product.saleprices}
                        style={{fontSize: "14px", lineHeight: "20px"}}
                        />
                    </div>
                ))}
            </div>
            <div className="LoadMore"
                onClick={loadmore}>
                    {isCLicked}
            </div>
        </div>
    )
}

export default OurProduct;