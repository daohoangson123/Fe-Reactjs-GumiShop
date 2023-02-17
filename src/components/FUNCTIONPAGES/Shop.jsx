import './Shop.css';
import { products_List } from '../../data/productsData';
import Product from '../RepeatComponent/Product';
import { useEffect, useState } from 'react';

const Shop = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    
    const [searchValue, setSearchValue] = useState("string");
    const [result, setResult] = useState(products_List);

    const handleChange = (event) => {
        setSearchValue(event.target.value);
        
        if (searchValue !== result) {
            setResult([]);
        }    
    }

    useEffect(() => {
        const serchTemp = []
        for (let i = 0; i < products_List.length; i++) {
            if (searchValue === "") {
                    setResult(products_List);
                    break; 
                } else if ((products_List[i].name
                            .replace(/\s+/g, '')
                            .toLocaleLowerCase()
                            .includes(searchValue
                            .replace(/\s+/g, '')
                            .toLocaleLowerCase()))) {
                                serchTemp.push(products_List[i]);
                                setResult(serchTemp);
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
            <h2>Check Our Products</h2>
            <div className="ProductContainer">
                {result.map((product) => (
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
        </div>
    )
}

export default Shop;