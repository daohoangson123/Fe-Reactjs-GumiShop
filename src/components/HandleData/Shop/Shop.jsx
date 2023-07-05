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
import ProductSkeleton from '../../Layout/UI/Skeleton/ProductSkeleton';
import ErrorBoundary from '../../Support/Error/ErrorBoundary';

const ShopFilter = ({
    productApi,
    debounceChange,
    filtered,
    onSale,
    setOnSale,
    sortFilter,
    setSortFilter,
    priceFilter,
    setPriceFilter,
}) => {
    const sortFilterOpt = [
        { label: 'Default', value: 'Default' },
        { label: 'PriceUp', value: 'PriceUp' },
        { label: 'PriceDown', value: 'PriceDown' },
        { label: 'NameUp', value: 'NameUp' },
        { label: 'NameDown', value: 'NameDown' },
    ];

    const priceFilterOpt = [
        { label: 'Default', value: 'Default' },
        { label: '< $100', value: '< $100' },
        { label: '$100 - $200', value: '$100 - $200' },
        { label: '> $200', value: '> $200' },
    ];

    return (
        <form
            className='SearchForm'
            action=''
            autoComplete='off'
            onSubmit={(event) => event.preventDefault()}>
            <fieldset disabled={productApi.length === 0 && true}>
                <input
                    className='NameFilterInput'
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
                    <abbr title='Show only on-sale Products'>
                        <input
                            type='checkbox'
                            name='onSale'
                            id='onSale'
                            checked={onSale}
                            onChange={(event) =>
                                setOnSale(event.target.checked)
                            }
                        />
                        <label htmlFor='onSale'>SaleOnly</label>
                    </abbr>
                    <abbr title='Find Products by price-ranges'>
                        <label htmlFor='priceFilter'>Price-range: </label>
                        <select
                            id='priceFilter'
                            className='priceFilter'
                            value={priceFilter}
                            onChange={(event) =>
                                setPriceFilter(event.target.value)
                            }>
                            {priceFilterOpt.map((opt) => (
                                <option
                                    key={opt.value}
                                    disabled={opt.value === priceFilter}
                                    value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </abbr>
                    <abbr title='Short Products'>
                        <label htmlFor='sortFilter'>Sort-by: </label>
                        <select
                            id='sortFilter'
                            className='sortFilter'
                            value={sortFilter}
                            onChange={(event) =>
                                setSortFilter(event.target.value)
                            }>
                            {sortFilterOpt.map((opt) => (
                                <option
                                    key={opt.value}
                                    disabled={opt.value === sortFilter}
                                    value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </abbr>
                </div>
            </fieldset>
            <div className='ProductAvailableCount'>
                {filtered.length > 0 &&
                    `${filtered.length} product${
                        filtered.length > 1 && 's'
                    } available.`}
            </div>
        </form>
    );
};

const ProductDisplay = ({ filtered }) => {
    return (
        <>
            <div className='ProductContainer ShopProductContainer'>
                {filtered.map((product) => (
                    <div
                        className='ProductItem'
                        key={product._id}>
                        <Product
                            id={product._id}
                            url={product.img}
                            name={product.name}
                            sale={product.sale}
                            prices={product.discouter}
                            saleprices={product.price}
                        />
                    </div>
                ))}
            </div>
            {filtered.length === 0 && (
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
    const [sortFilter, setSortFilter] = useState('Default');
    const [priceFilter, setPriceFilter] = useState('Default');
    const result = [...productApi];

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const debounceChange = useMemo(() => debounce(handleChange, 500), []);

    const getFilterItems = (
        searchValue,
        result,
        onSale,
        sortFilter,
        priceFilter,
    ) => {
        const searchByName = result.filter((product) => {
            const query = searchValue.replace(/\s+/g, '').toLowerCase();
            const productName = product.name.replace(/\s+/g, '').toLowerCase();
            return productName.includes(query);
        });
        const saleOnly = result.filter((product) => product.sale === true);
        const searchByNameSale = searchByName.filter(
            (product) => product.sale === true,
        );
        //default
        if (sortFilter === 'Default' && priceFilter === 'Default') {
            //nameOnly
            if (searchValue && !onSale) {
                return searchByName;
                //saleOnly
            } else if (!searchValue && onSale) {
                return saleOnly;
                //name&sale
            } else if (searchValue && onSale) {
                return searchByNameSale;
            }
            //default
            return result;
        }
        //sortFilter
        if (sortFilter !== 'Default' && priceFilter === 'Default') {
            switch (sortFilter !== 'Default') {
                case !searchValue && onSale:
                    switch (true) {
                        case sortFilter === 'PriceUp':
                            return saleOnly.toSorted(
                                (a, b) => a.price - b.price,
                            );
                        case sortFilter === 'PriceDown':
                            return saleOnly.toSorted(
                                (a, b) => b.price - a.price,
                            );
                        case sortFilter === 'NameUp':
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
                        case sortFilter === 'NameDown':
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
                        case sortFilter === 'PriceUp':
                            return searchByName.toSorted(
                                (a, b) => a.price - b.price,
                            );
                        case sortFilter === 'PriceDown':
                            return searchByName.toSorted(
                                (a, b) => b.price - a.price,
                            );
                        case sortFilter === 'NameUp':
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
                        case sortFilter === 'NameDown':
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
                case searchValue && onSale:
                    switch (true) {
                        case sortFilter === 'PriceUp':
                            return searchByNameSale.toSorted(
                                (a, b) => a.price - b.price,
                            );
                        case sortFilter === 'PriceDown':
                            return searchByNameSale.toSorted(
                                (a, b) => b.price - a.price,
                            );
                        case sortFilter === 'NameUp':
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
                        case sortFilter === 'NameDown':
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
                default:
                    switch (true) {
                        case sortFilter === 'PriceUp':
                            return result.toSorted((a, b) => a.price - b.price);
                        case sortFilter === 'PriceDown':
                            return result.toSorted((a, b) => b.price - a.price);
                        case sortFilter === 'NameUp':
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
                        case sortFilter === 'NameDown':
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
        }

        //priceFilter
        if (sortFilter === 'Default' && priceFilter !== 'Default') {
            //priceFilterOnly
            if (!searchValue && !onSale) {
                if (priceFilter === '< $100') {
                    return result.filter((product) => product.price < 100);
                } else if (priceFilter === '$100 - $200') {
                    return result.filter(
                        (product) =>
                            product.price >= 100 && product.price <= 200,
                    );
                } else if (priceFilter === '> $200') {
                    return result.filter((product) => product.price > 200);
                }
            }
            //name&price
            if (searchValue && !onSale) {
                if (priceFilter === '< $100') {
                    return searchByName.filter(
                        (product) => product.price < 100,
                    );
                } else if (priceFilter === '$100 - $200') {
                    return searchByName.filter(
                        (product) =>
                            product.price >= 100 && product.price <= 200,
                    );
                } else if (priceFilter === '> $200') {
                    return searchByName.filter(
                        (product) => product.price > 200,
                    );
                }
            }
            //sale&price
            if (!searchValue && onSale) {
                if (priceFilter === '< $100') {
                    return saleOnly.filter((product) => product.price < 100);
                } else if (priceFilter === '$100 - $200') {
                    return saleOnly.filter(
                        (product) =>
                            product.price >= 100 && product.price <= 200,
                    );
                } else if (priceFilter === '> $200') {
                    return saleOnly.filter((product) => product.price > 200);
                }
            }
            //name&sale&price
            if (searchValue && onSale) {
                if (priceFilter === '< $100') {
                    return searchByNameSale.filter(
                        (product) => product.price < 100,
                    );
                } else if (priceFilter === '$100 - $200') {
                    return searchByNameSale.filter(
                        (product) =>
                            product.price >= 100 && product.price <= 200,
                    );
                } else if (priceFilter === '> $200') {
                    return searchByNameSale.filter(
                        (product) => product.price > 200,
                    );
                }
            }
        }
        //sort&price
        if (sortFilter !== 'Default' && priceFilter !== 'Default') {
            //
            if (!searchValue && !onSale) {
                if (sortFilter === 'PriceUp') {
                    if (priceFilter === '< $100') {
                        return result
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => a.price - b.price);
                    } else if (priceFilter === '$100 - $200') {
                        return result
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => a.price - b.price);
                    } else if (priceFilter === '> $200') {
                        return result
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => a.price - b.price);
                    }
                } else if (sortFilter === 'PriceDown') {
                    if (priceFilter === '< $100') {
                        return result
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => b.price - a.price);
                    } else if (priceFilter === '$100 - $200') {
                        return result
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => b.price - a.price);
                    } else if (priceFilter === '> $200') {
                        return result
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => b.price - a.price);
                    }
                } else if (sortFilter === 'NameUp') {
                    if (priceFilter === '< $100') {
                        return result
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '$100 - $200') {
                        return result
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '> $200') {
                        return result
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => {
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
                    }
                } else if (sortFilter === 'NameDown') {
                    if (priceFilter === '< $100') {
                        return result
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '$100 - $200') {
                        return result
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '> $200') {
                        return result
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => {
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
                    }
                }
            }
            //
            if (searchValue && !onSale) {
                if (sortFilter === 'PriceUp') {
                    if (priceFilter === '< $100') {
                        return searchByName
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => a.price - b.price);
                    } else if (priceFilter === '$100 - $200') {
                        return searchByName
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => a.price - b.price);
                    } else if (priceFilter === '> $200') {
                        return searchByName
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => a.price - b.price);
                    }
                } else if (sortFilter === 'PriceDown') {
                    if (priceFilter === '< $100') {
                        return searchByName
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => b.price - a.price);
                    } else if (priceFilter === '$100 - $200') {
                        return searchByName
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => b.price - a.price);
                    } else if (priceFilter === '> $200') {
                        return searchByName
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => b.price - a.price);
                    }
                } else if (sortFilter === 'NameUp') {
                    if (priceFilter === '< $100') {
                        return searchByName
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '$100 - $200') {
                        return searchByName
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '> $200') {
                        return searchByName
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => {
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
                    }
                } else if (sortFilter === 'NameDown') {
                    if (priceFilter === '< $100') {
                        return searchByName
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '$100 - $200') {
                        return searchByName
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '> $200') {
                        return searchByName
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => {
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
                    }
                }
            }
            //
            if (!searchValue && onSale) {
                if (sortFilter === 'PriceUp') {
                    if (priceFilter === '< $100') {
                        return saleOnly
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => a.price - b.price);
                    } else if (priceFilter === '$100 - $200') {
                        return saleOnly
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => a.price - b.price);
                    } else if (priceFilter === '> $200') {
                        return saleOnly
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => a.price - b.price);
                    }
                } else if (sortFilter === 'PriceDown') {
                    if (priceFilter === '< $100') {
                        return saleOnly
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => b.price - a.price);
                    } else if (priceFilter === '$100 - $200') {
                        return result
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => b.price - a.price);
                    } else if (priceFilter === '> $200') {
                        return saleOnly
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => b.price - a.price);
                    }
                } else if (sortFilter === 'NameUp') {
                    if (priceFilter === '< $100') {
                        return saleOnly
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '$100 - $200') {
                        return saleOnly
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '> $200') {
                        return saleOnly
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => {
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
                    }
                } else if (sortFilter === 'NameDown') {
                    if (priceFilter === '< $100') {
                        return saleOnly
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '$100 - $200') {
                        return saleOnly
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '> $200') {
                        return saleOnly
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => {
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
                    }
                }
            }
            //
            if (searchValue && onSale) {
                if (sortFilter === 'PriceUp') {
                    if (priceFilter === '< $100') {
                        return searchByNameSale
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => a.price - b.price);
                    } else if (priceFilter === '$100 - $200') {
                        return searchByNameSale
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => a.price - b.price);
                    } else if (priceFilter === '> $200') {
                        return searchByNameSale
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => a.price - b.price);
                    }
                } else if (sortFilter === 'PriceDown') {
                    if (priceFilter === '< $100') {
                        return searchByNameSale
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => b.price - a.price);
                    } else if (priceFilter === '$100 - $200') {
                        return searchByNameSale
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => b.price - a.price);
                    } else if (priceFilter === '> $200') {
                        return searchByNameSale
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => b.price - a.price);
                    }
                } else if (sortFilter === 'NameUp') {
                    if (priceFilter === '< $100') {
                        return searchByNameSale
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '$100 - $200') {
                        return searchByNameSale
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '> $200') {
                        return searchByNameSale
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => {
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
                    }
                } else if (sortFilter === 'NameDown') {
                    if (priceFilter === '< $100') {
                        return searchByNameSale
                            .filter((product) => product.price < 100)
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '$100 - $200') {
                        return searchByNameSale
                            .filter(
                                (product) =>
                                    product.price >= 100 &&
                                    product.price <= 200,
                            )
                            .toSorted((a, b) => {
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
                    } else if (priceFilter === '> $200') {
                        return searchByNameSale
                            .filter((product) => product.price > 200)
                            .toSorted((a, b) => {
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
                    }
                }
            }
        }
    };

    const filtered = getFilterItems(
        searchValue,
        result,
        onSale,
        sortFilter,
        priceFilter,
    );

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
        <div className='Shop Container'>
            <ErrorBoundary>
                <ShopFilter
                    productApi={productApi}
                    debounceChange={debounceChange}
                    filtered={filtered}
                    onSale={onSale}
                    setOnSale={setOnSale}
                    sortFilter={sortFilter}
                    setSortFilter={setSortFilter}
                    priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter}
                />
                {productApi.length !== 0 ? (
                    <ProductDisplay filtered={filtered} />
                ) : (
                    <div className='ProductContainer ShopProductContainer'>
                        <ProductSkeleton />
                    </div>
                )}
            </ErrorBoundary>
        </div>
    );
};

export default Shop;
