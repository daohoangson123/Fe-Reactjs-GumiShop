import './Shop.css';
import Product from '../../RepeatComponent/Product';
import { useEffect, useState } from 'react';

const Shop = () => {
    const [productApi, setProductApi] = useState([]);
    const data = [...productApi];
    const [result, setResult] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const [searchValue, setSearchValue] = useState('undefined');

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        async function getApi() {
            const fetchAPI = await fetch('https://fe21-db.vercel.app/gummi');
            const fetchedAPI = await fetchAPI.json();
            const results = fetchedAPI;
            setProductApi(results);
        }

        getApi();
    }, []);

    useEffect(() => {
        const searchTemp = [];
        for (let i = 0; i < data.length; i++) {
            const searchKeyword = data[i].name
                .replace(/\s+/g, '')
                .toLocaleLowerCase();
            const keyword = searchValue.replace(/\s+/g, '').toLocaleLowerCase();

            if (searchKeyword.includes(keyword)) {
                searchTemp.push(data[i]);
                setResult(searchTemp);
            } else if (searchTemp.length === 0) {
                setResult([]);
            }
        }
    }, [searchValue]);

    return (
        <div className='Shop container'>
            <div className='OurProduct'>
                <form
                    className='SearchForm '
                    action=''
                    autoComplete='off'
                    onSubmit={handleSubmit}
                >
                    <input
                        type='text'
                        name='searchkw'
                        id='searchkw'
                        placeholder="Search by Product's name"
                        required
                        className='SearchInput '
                        onChange={handleChange}
                    />
                    <div className='ProductCount'>
                        {(result.length === 0 && searchValue === 'undefined') ||
                        searchValue === '' ? (
                            <div>Please enter Product's name</div>
                        ) : (
                            <div>
                                {result.length} item
                                {result.length > 1 ? 's' : null} found
                            </div>
                        )}
                    </div>
                </form>
                {data.length === 0 ? (
                    <div className='WaitAPI'>
                        Loading Products... Please Wait A Second
                    </div>
                ) : null}
                <div className='ProductContainer ShopProductContainer'>
                    {result.length === 0 && searchValue === 'undefined'
                        ? data.map((product) => (
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
                          ))
                        : result.map((product) => (
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
            </div>
        </div>
    );
};

export default Shop;
