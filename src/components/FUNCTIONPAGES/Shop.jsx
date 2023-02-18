import './Shop.css';
import Product from '../RepeatComponent/Product';
import { useEffect, useState } from 'react';

const Shop = () => {
    const [api, setApi] = useState([]);
    const [result, setResult] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    
    const [searchValue, setSearchValue] = useState(undefined);
    
    const handleChange = (event) => {
        setSearchValue(event.target.value);

        if (result !== searchValue) {
            setResult([])
        }
    }

    useEffect(() => {
        async function getApi() {
            const fetchAPI = await fetch ("https://fe21-db.vercel.app/gummi");
            const fetchedAPI = await fetchAPI.json();
            const result = fetchedAPI;
            setApi(result);
        };

        getApi();
    }, []);

    useEffect(() => {
        const searchTemp = [];
        for (let i = 0; i < api.length; i++) {
            if (searchValue === "") {
                    setResult(api);
                    break;
                } else if ((api[i].name
                    .replace(/\s+/g, '')
                    .toLocaleLowerCase()
                    .includes(searchValue
                    .replace(/\s+/g, '')
                    .toLocaleLowerCase()))) {
                        searchTemp.push(api[i]);
                        setResult(searchTemp);
                }
        };
    }, [searchValue])

    return (
        <div className='Shop'>
            <div className='OurProduct'>
            <form className='SearchForm '
                action="" autoComplete='off'
                onSubmit={handleSubmit}    >
                <input type="text" name="searchkw" id="searchkw" placeholder="Search by Product's name" required
                    className='SearchInput '
                    onChange={handleChange}
                />
            </form>
                <div className='ProductCount'>
                    {result.length === 0 && searchValue === undefined
                    ? null
                    : result.length !== 0 && searchValue === ""
                    ? null
                    : <div>{result.length} item found</div>}
                </div>
            <span className='Guide'>Looking For Products? Just a letter of its name</span>
                {api.length === 0
                ? <div className='WaitAPI'>Loading Products... Please Wait A Second</div>
                : null}
            <div className="ProductContainer ShopProductContainer">
                {result.length === 0 && searchValue === undefined
                ? api.map((product) => (
                    <div className="ProductItem" key={product._id}>
                        <Product
                        url={product.img}
                        name={product.name}
                        sale={product.sale}
                        prices={product.discouter}
                        saleprices={product.price}
                        style={{fontSize: "14px", lineHeight: "20px"}}
                        />
                    </div>
                    ))
                : result.map((product) => (
                    <div className="ProductItem" key={product._id}>
                        <Product
                        url={product.img}
                        name={product.name}
                        sale={product.sale}
                        prices={product.price}
                        saleprices={product.discouter}
                        style={{fontSize: "14px", lineHeight: "20px"}}
                        />
                    </div>
                    ))
                }
            </div>
        </div>
        </div>
    )
}

export default Shop;