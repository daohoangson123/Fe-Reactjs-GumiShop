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

const ShopFilter = ({
    productApi,
    debounceChange,
    onSale,
    setOnSale,
    filter,
    setFilter,
}) => {
    const filterOpt = [
        { type: 'Default' },
        { type: 'PriceUp' },
        { type: 'PriceDown' },
        { type: 'NameUp' },
        { type: 'NameDown' },
    ];

    return (
        <form
            className='SearchForm'
            action=''
            autoComplete='off'
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
                        onChange={(event) => setOnSale(event.target.checked)}
                    />
                    <label htmlFor='onSale'>On Sale Products</label>
                </div>
                <div>
                    <label htmlFor='sortFilter'>Sort by: </label>
                    <select
                        id='sortFilter'
                        className='sortFilter'
                        disabled={productApi.length !== 0 ? false : true}
                        defaultChecked={filter}
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                    >
                        {filterOpt.map((opt) => (
                            <option
                                key={opt.type}
                                style={
                                    opt.type === filter
                                        ? {
                                              backgroundColor:
                                                  'var(--color-primary)',
                                              color: 'var(--color-default)',
                                          }
                                        : null
                                }
                            >
                                {opt.type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </form>
    );
};

const ProductDisplay = ({ searchValue, filtered }) => {
    return (
        <>
            {searchValue !== '' && (
                <div>
                    {filtered.length} product
                    {filtered.length > 1 && 's'} found!
                </div>
            )}
            {filtered.length !== 0 && searchValue === '' ? (
                <div>{filtered.length} products available</div>
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
    );
};

const Shop = () => {
    const [productApi, setProductApi] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [onSale, setOnSale] = useState(false);
    const [filter, setFilter] = useState('Default');
    const result = [...productApi];

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const debounceChange = useMemo(() => debounce(handleChange, 500), []);

    const getFilterItems = (searchValue, result, onSale, filter) => {
        const query = searchValue.replace(/\s+/g, '').toLowerCase();
        const searchByName = result.filter((product) => {
            const productName = product.name.replace(/\s+/g, '').toLowerCase();
            return productName.includes(query);
        });
        const saleOnly = result.filter((product) => product.sale === true);
        const searchByNameSale = searchByName.filter(
            (product) => product.sale === true,
        );
        //default
        if (filter === 'Default') {
            if (searchValue && onSale) {
                return searchByName.filter((product) => product.sale === true);
            } else if (!searchValue && onSale) {
                return saleOnly;
            } else if (searchValue && !onSale) {
                return searchByName;
            }
            return result;
        }
        //filter
        switch (filter !== 'Default') {
            case searchValue && onSale:
                switch (true) {
                    case filter === 'PriceUp':
                        return searchByNameSale.toSorted(
                            (a, b) => a.price - b.price,
                        );
                    case filter === 'PriceDown':
                        return searchByNameSale.toSorted(
                            (a, b) => b.price - a.price,
                        );
                    case filter === 'NameUp':
                        return searchByNameSale.toSorted((a, b) => {
                            const nameA = a.name.toLowerCase();
                            const nameB = b.name.toLowerCase();
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0;
                        });
                    case filter === 'NameDown':
                        return searchByNameSale.toSorted((a, b) => {
                            const nameA = a.name.toLowerCase();
                            const nameB = b.name.toLowerCase();
                            if (nameA < nameB) {
                                return 1;
                            }
                            if (nameA > nameB) {
                                return -1;
                            }
                            return 0;
                        });
                    default:
                        return;
                }
            case !searchValue && onSale:
                switch (true) {
                    case filter === 'PriceUp':
                        return saleOnly.toSorted((a, b) => a.price - b.price);
                    case filter === 'PriceDown':
                        return saleOnly.toSorted((a, b) => b.price - a.price);
                    case filter === 'NameUp':
                        return saleOnly.toSorted((a, b) => {
                            const nameA = a.name.toLowerCase();
                            const nameB = b.name.toLowerCase();
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0;
                        });
                    case filter === 'NameDown':
                        return saleOnly.toSorted((a, b) => {
                            const nameA = a.name.toLowerCase();
                            const nameB = b.name.toLowerCase();
                            if (nameA < nameB) {
                                return 1;
                            }
                            if (nameA > nameB) {
                                return -1;
                            }
                            return 0;
                        });
                    default:
                        return;
                }
            case searchValue && !onSale:
                switch (true) {
                    case filter === 'PriceUp':
                        return searchByName.toSorted(
                            (a, b) => a.price - b.price,
                        );
                    case filter === 'PriceDown':
                        return searchByName.toSorted(
                            (a, b) => b.price - a.price,
                        );
                    case filter === 'NameUp':
                        return searchByName.toSorted((a, b) => {
                            const nameA = a.name.toLowerCase();
                            const nameB = b.name.toLowerCase();
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0;
                        });
                    case filter === 'NameDown':
                        return searchByName.toSorted((a, b) => {
                            const nameA = a.name.toLowerCase();
                            const nameB = b.name.toLowerCase();
                            if (nameA < nameB) {
                                return 1;
                            }
                            if (nameA > nameB) {
                                return -1;
                            }
                            return 0;
                        });
                    default:
                        return;
                }
            default:
                switch (true) {
                    case filter === 'PriceUp':
                        return result.toSorted((a, b) => a.price - b.price);
                    case filter === 'PriceDown':
                        return result.toSorted((a, b) => b.price - a.price);
                    case filter === 'NameUp':
                        return result.toSorted((a, b) => {
                            const nameA = a.name.toLowerCase();
                            const nameB = b.name.toLowerCase();
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0;
                        });
                    case filter === 'NameDown':
                        return result.toSorted((a, b) => {
                            const nameA = a.name.toLowerCase();
                            const nameB = b.name.toLowerCase();
                            if (nameA < nameB) {
                                return 1;
                            }
                            if (nameA > nameB) {
                                return -1;
                            }
                            return 0;
                        });
                    default:
                        return;
                }
        }
    };

    const filtered = getFilterItems(searchValue, result, onSale, filter);

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
            <ShopFilter
                productApi={productApi}
                debounceChange={debounceChange}
                onSale={onSale}
                setOnSale={setOnSale}
                filter={filter}
                setFilter={setFilter}
            />
            {productApi.length !== 0 ? (
                <ProductDisplay
                    searchValue={searchValue}
                    filtered={filtered}
                />
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
