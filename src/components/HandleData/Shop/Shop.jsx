import './Shop.css';
//
import noitem from '../../../assets/img/noitem.webp';
//
import { fetchProductApi } from '../../../data/axiosAPI/productData';
//
import { useEffect, useState } from 'react';
//
import Product from '../../Layout/UI/Product/Product';
import ProductSkeleton from '../../Layout/UI/Skeleton/ProductSkeleton';
import { useSearchParams } from 'react-router-dom';
import Loading from '../../Layout/UI/Loading/Loading';

const ShopFilter = ({
    productApi,
    filtered,
    handleNameChange,
    handleSaleCheck,
    handlePriceChange,
    handleSortChange,
    q,
    saleChecked,
    price,
    sort,
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

    const [showFilter, setShowFilter] = useState(false);

    return (
        <form
            className="SearchForm"
            action=""
            autoComplete="off"
            onSubmit={(event) => event.preventDefault()}
        >
            {productApi.length === 0 ? (
                <Loading />
            ) : (
                <>
                    <fieldset disabled={productApi.length === 0}>
                        <button
                            type="button"
                            className="ToggleFilter__Btn"
                            style={{
                                background: showFilter
                                    ? 'var(--color-primary-rgba)'
                                    : 'var(--color-primary)',
                            }}
                            title={
                                showFilter
                                    ? 'Hide filter options'
                                    : 'Show detail filter options'
                            }
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            {showFilter ? 'Hide Filter' : 'Show Filter'}
                        </button>
                        <div
                            className="FiltersInputs"
                            style={{ maxHeight: showFilter && '150px' }}
                        >
                            <input
                                className="NameFilterInput"
                                type="text"
                                name="searchkw"
                                id="searchkw"
                                // defaultValue={q}
                                value={q}
                                title={`Enter some product's character Ex: vitamin, detox etc`}
                                placeholder={
                                    productApi.length !== 0
                                        ? `Enter some product's character`
                                        : 'Please wait a sec...'
                                }
                                onChange={(event) => handleNameChange(event)}
                            />
                            <div className="SaleCheckBox">
                                <input
                                    type="checkbox"
                                    name="onSale"
                                    id="onSale"
                                    title="Show only on-sale Products"
                                    checked={saleChecked}
                                    onChange={(event) => {
                                        handleSaleCheck(event);
                                    }}
                                />
                                <label
                                    htmlFor="onSale"
                                    title="Show only on-sale Products"
                                >
                                    SaleOnly
                                </label>
                            </div>
                            <div>
                                <label
                                    htmlFor="priceFilter"
                                    title="Find Products by price-ranges"
                                >
                                    Price-range:{' '}
                                </label>
                                <select
                                    id="priceFilter"
                                    className="priceFilter"
                                    title="Find Products by price-ranges"
                                    value={price}
                                    onChange={(event) =>
                                        handlePriceChange(event)
                                    }
                                >
                                    {priceFilterOpt.map((opt) => (
                                        <option
                                            disabled={price === opt.label}
                                            key={opt.value}
                                            value={opt.value}
                                            title={opt.value}
                                        >
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    htmlFor="sortFilter"
                                    title="Sort Products"
                                >
                                    Sort-by:{' '}
                                </label>
                                <select
                                    id="sortFilter"
                                    className="sortFilter"
                                    title="Sort Products"
                                    value={sort}
                                    onChange={(event) =>
                                        handleSortChange(event)
                                    }
                                >
                                    {sortFilterOpt.map((opt) => (
                                        <option
                                            disabled={sort === opt.label}
                                            key={opt.value}
                                            value={opt.value}
                                            title={opt.value}
                                        >
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </fieldset>
                    <div className="ProductAvailableCount">
                        {filtered?.length > 0
                            ? `${filtered.length} product${filtered.length > 1 ? 's' : ''} available.`
                            : 'Please try other products!'}
                    </div>
                </>
            )}
        </form>
    );
};

const ProductDisplay = ({ filtered }) => {
    return (
        <>
            <div className="ProductContainer ShopProductContainer">
                {filtered &&
                    filtered.map((product) => (
                        <div
                            className="ProductItem"
                            key={product._id || product.id}
                        >
                            <Product
                                id={product._id || product.id}
                                url={product.img || product.color}
                                name={product.name}
                                sale={product.sale}
                                prices={product.discouter}
                                saleprices={product.price}
                            />
                        </div>
                    ))}
                {filtered?.length === 0 && (
                    <img className="NoItemImg" src={noitem} alt="NoItemFound" />
                )}
            </div>
        </>
    );
};

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        search: '',
        saleChecked: false,
        price: 'Default',
        sort: 'Default',
    });
    const q = searchParams.get('search');
    const saleChecked = searchParams.get('saleChecked') === 'true';
    const price = searchParams.get('price');
    const sort = searchParams.get('sort');
    const [productApi, setProductApi] = useState([]);
    const [searchValue, setSearchValue] = useState(q);
    const [onSale, setOnSale] = useState(saleChecked);
    const [priceFilter, setPriceFilter] = useState(price);
    const [sortFilter, setSortFilter] = useState(sort);
    const result = [...productApi];

    const handleNameChange = (event) => {
        setSearchValue(event.target.value);
        setSearchParams(
            (pre) => {
                pre.set('search', event.target.value);
                return pre;
            },
            { replace: true }
        );
    };

    const handleSaleCheck = (event) => {
        setOnSale(event.target.checked);
        setSearchParams(
            (pre) => {
                pre.set('saleChecked', event.target.checked);
                return pre;
            },
            { replace: true }
        );
    };

    const handlePriceChange = (event) => {
        setPriceFilter(event.target.value);
        setSearchParams(
            (pre) => {
                pre.set('price', event.target.value);
                return pre;
            },
            { replace: true }
        );
    };

    const handleSortChange = (event) => {
        setSortFilter(event.target.value);
        setSearchParams(
            (pre) => {
                pre.set('sort', event.target.value);
                return pre;
            },
            { replace: true }
        );
    };

    const getFilterItems = (
        searchValue,
        result,
        onSale,
        sortFilter,
        priceFilter
    ) => {
        const searchByName = result.filter((product) => {
            const query = searchValue.replace(/\s+/g, '').toLowerCase();
            const productName = product.name.replace(/\s+/g, '').toLowerCase();
            return productName.includes(query);
        });
        const saleOnly = result.filter((product) => product.sale === true);
        const searchByNameSale = searchByName.filter(
            (product) => product.sale === true
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
                                (a, b) => a.price - b.price
                            );
                        case sortFilter === 'PriceDown':
                            return saleOnly.toSorted(
                                (a, b) => b.price - a.price
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
                                (a, b) => a.price - b.price
                            );
                        case sortFilter === 'PriceDown':
                            return searchByName.toSorted(
                                (a, b) => b.price - a.price
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
                                (a, b) => a.price - b.price
                            );
                        case sortFilter === 'PriceDown':
                            return searchByNameSale.toSorted(
                                (a, b) => b.price - a.price
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
                            product.price >= 100 && product.price <= 200
                    );
                } else if (priceFilter === '> $200') {
                    return result.filter((product) => product.price > 200);
                }
            }
            //name&price
            if (searchValue && !onSale) {
                if (priceFilter === '< $100') {
                    return searchByName.filter(
                        (product) => product.price < 100
                    );
                } else if (priceFilter === '$100 - $200') {
                    return searchByName.filter(
                        (product) =>
                            product.price >= 100 && product.price <= 200
                    );
                } else if (priceFilter === '> $200') {
                    return searchByName.filter(
                        (product) => product.price > 200
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
                            product.price >= 100 && product.price <= 200
                    );
                } else if (priceFilter === '> $200') {
                    return saleOnly.filter((product) => product.price > 200);
                }
            }
            //name&sale&price
            if (searchValue && onSale) {
                if (priceFilter === '< $100') {
                    return searchByNameSale.filter(
                        (product) => product.price < 100
                    );
                } else if (priceFilter === '$100 - $200') {
                    return searchByNameSale.filter(
                        (product) =>
                            product.price >= 100 && product.price <= 200
                    );
                } else if (priceFilter === '> $200') {
                    return searchByNameSale.filter(
                        (product) => product.price > 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
                                    product.price >= 100 && product.price <= 200
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
        priceFilter
    );

    const getProducts = async () => {
        let result = await fetchProductApi();

        if (result) {
            setProductApi(result);
        }
    };

    useEffect(() => {
        document.title = 'Gumi Shopify - Shop';

        getProducts();

        return () => {
            document.title = 'Gumi Shopify';
        };
    }, []);

    return (
        <div className="Shop">
            <ShopFilter
                productApi={productApi}
                filtered={filtered}
                handleNameChange={handleNameChange}
                handleSaleCheck={handleSaleCheck}
                handlePriceChange={handlePriceChange}
                handleSortChange={handleSortChange}
                q={q}
                saleChecked={saleChecked}
                price={price}
                sort={sort}
            />
            <div className="Container">
                {productApi.length > 0 ? (
                    <ProductDisplay filtered={filtered} />
                ) : (
                    <div className="ProductContainer ShopProductContainer">
                        <ProductSkeleton />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
