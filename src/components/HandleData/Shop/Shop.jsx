import './Shop.css';
//
import noitem from '../../../assets/img/noitem.webp';
//
import { fetchProductApi } from '../../../data/axiosAPI/productData';
//
import { useEffect, useMemo, useState } from 'react';
import { debounce } from 'lodash';
//
import Product from '../../Layout/UI/Product/Product';
import Loading from '../../Layout/UI/Loading/Loading';

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

        return () => {
            debounceChange.cancel();
        };
    }, [debounceChange]);

    return (
        <>
            {productApi.length !== 0 ? (
                <section className='Shop Container'>
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
                            className='EmptyCardImg'
                            src={noitem}
                            alt='NoItemFound'
                        />
                    )}
                </section>
            ) : (
                <Loading loadingContent={"Loading products's data"} />
            )}
        </>
    );
};

export default Shop;
