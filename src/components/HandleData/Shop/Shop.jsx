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
import ProductSkeleton from '../../Layout/UI/Skeleton/ProductSkeleton';

const Shop = () => {
    const [productApi, setProductApi] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [onSale, setOnSale] = useState(false);
    const result = [...productApi];

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const debounceChange = useMemo(() => debounce(handleChange, 500), []);

    const getFilterItems = (searchValue, result, onSale) => {
        const query = searchValue.replace(/\s+/g, '').toLocaleLowerCase();
        const onSaleProduct = result.filter((product) => product.sale === true);
        //default
        if (!searchValue && !onSale) {
            return result;
        }
        //sale
        if (!searchValue && onSale) {
            return onSaleProduct;
        }
        //search&sale
        if (searchValue && onSale) {
            const filteredName = result.filter((product) => {
                const productName = product.name
                    .replace(/\s+/g, '')
                    .toLocaleLowerCase();
                return productName.includes(query);
            });
            return filteredName.filter((product) => product.sale === true);
        }
        //search
        return result.filter((product) => {
            const productName = product.name
                .replace(/\s+/g, '')
                .toLocaleLowerCase();
            return productName.includes(query);
        });
    };

    const filtered = getFilterItems(searchValue, result, onSale);

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
        <section className='Shop Container'>
            <form
                className='SearchForm'
                action=''
                autoComplete='off'
                onSubmit={handleSubmit}
            >
                <input
                    className='NameFilterInput'
                    disabled={productApi.length !== 0 ? false : true}
                    type='text'
                    name='searchkw'
                    id='searchkw'
                    placeholder={
                        productApi.length !== 0
                            ? `Enter product's name`
                            : 'Please wait a sec...'
                    }
                    required
                    onChange={debounceChange}
                />
                <div className='FiltersInputs'>
                    <div>
                        <input
                            type='checkbox'
                            name='onSale'
                            id='onSale'
                            checked={onSale}
                            disabled={productApi.length !== 0 ? false : true}
                            onChange={(event) =>
                                setOnSale(event.target.checked)
                            }
                        />
                        <label htmlFor='onSale'>On Sale Products</label>
                    </div>
                </div>
            </form>
            {productApi.length !== 0 ? (
                <>
                    {searchValue !== '' && (
                        <>
                            <div>
                                {filtered.length} product
                                {filtered.length > 1 && 's'} found
                            </div>
                            <br />
                        </>
                    )}
                    {filtered.length !== 0 && searchValue === '' ? (
                        <>
                            <div>{filtered.length} products available</div>
                            <br />
                        </>
                    ) : null}
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
                            className='NoItemImg'
                            src={noitem}
                            alt='NoItemFound'
                        />
                    )}
                </>
            ) : (
                <>
                    <Loading />
                    <div className='ProductContainer ShopProductContainer'>
                        <ProductSkeleton />
                        <ProductSkeleton />
                    </div>
                </>
            )}
        </section>
    );
};

export default Shop;
