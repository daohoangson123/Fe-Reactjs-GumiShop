import './Shop.css';
//
import noitem from '../../../Assets/img/noitem.webp';
//
import Loading from '../../SupportComponent/Loading/Loading';
//
import { fetchProductApi } from '../../../Data/axiosAPI/productData';
//
import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
//
const Product = lazy(() => import('../../RepeatComponent/Product'));

const Shop = () => {
    const [productApi, setProductApi] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const result = [...productApi];

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const debounceChange = useMemo(() => debounce(handleChange, 500), []);

    const getFilterItems = (searchValue, result) => {
        const query = searchValue.replace(/\s+/g, '').toLocaleLowerCase();
        if (!searchValue) {
            return result;
        }
        return result.filter((product) => {
            const productName = product.name
                .replace(/\s+/g, '')
                .toLocaleLowerCase();
            return productName.includes(query);
        });
    };

    const filtered = getFilterItems(searchValue, result);

    const getProducts = async () => {
        let result = await fetchProductApi();

        if (result) {
            setProductApi(result);
        }
    };

    useEffect(() => {
        getProducts();

        document.title = 'Gumi Shopify - Shopping Page';

        return () => {
            debounceChange.cancel();
        };
    }, [debounceChange]);

    return (
        <section className='Shop container'>
            <Suspense>
                {productApi.length !== 0 && (
                    <form
                        className='SearchForm'
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
                            onChange={debounceChange}
                        />
                        {searchValue !== '' && (
                            <div>
                                {filtered.length} product
                                {filtered.length > 1 && 's'} found
                            </div>
                        )}
                        {filtered.length !== 0 && searchValue === '' ? (
                            <div>{filtered.length} products available</div>
                        ) : null}
                    </form>
                )}
                {productApi.length === 0 && (
                    <Loading loadingContent='Loading Product Data...' />
                )}

                <div className='ProductContainer ShopProductContainer'>
                    {filtered.map((product) => (
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
                {filtered.length === 0 && searchValue !== '' && (
                    <img
                        src={noitem}
                        alt='NoItemFound'
                        style={{ width: '300px', height: '300px' }}
                    />
                )}
            </Suspense>
        </section>
    );
};

export default Shop;
