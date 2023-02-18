import './Shop.css';
import Product from '../RepeatComponent/Product';
import { useEffect, useState } from 'react';

const Shop = () => {
    const [api, setApi] = useState([]);
    const [result, setResult] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
    }
    
    const [searchValue, setSearchValue] = useState("");
    
    const handleChange = (event) => {
        setSearchValue(event.target.value);

        if (searchValue !== result) {
            setResult([])
        } else if(searchValue === "") {
            setResult(api)
        }
    }

    useEffect(() => {
        (async function () {
            const fetchAPI = await fetch ("https://fe21-db.vercel.app/gummi");
            const fetchedAPI = await fetchAPI.json();
            const results = fetchedAPI;
            setApi(result);
            setResult(results);
        })();
        if (searchValue !== result) {
            setResult([])
        } else if(searchValue === "") {
            setResult(api)
        }
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
        if (searchValue !== result) {
            setResult([])
        } else if(searchValue === "") {
            setResult(api)
        }
    }, [])

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
            <h2>Check Our Products</h2>
            <div className="ProductContainer">
                {result !== [] ?
                result.map((product) => (
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
                : "123"
                }
            </div>
        </div>
        </div>
    )
}

export default Shop;