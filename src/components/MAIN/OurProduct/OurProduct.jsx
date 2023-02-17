import './OurProduct.css';
import p1 from '../../../img/product1.png';
import p4 from '../../../img/product4.png';
import Product from '../../RepeatComponent/Product';

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
    return (
        <div className='OurProduct'>
            <h2>OUR PRODUCTS ARE</h2>
            <div className="ProductContainer">
                {products_List.map((product) => (
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
        </div>
    )
}

export default OurProduct;