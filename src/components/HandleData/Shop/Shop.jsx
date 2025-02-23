import './Shop.css';
//
import noitem from '../../../assets/img/noitem.jpg';
//
import { fetchProductApi } from '../../../data/axiosAPI/productData';
//
import { useCallback, useEffect, useMemo, useState } from 'react';
//
import Product from '../../Layout/UI/Product/Product';
import ProductSkeleton from '../../Layout/UI/Skeleton/ProductSkeleton';
import { useSearchParams } from 'react-router-dom';
import Loading from '../../Layout/UI/Loading/Loading';
import { debounce } from 'lodash';

const ShopFilter = ({
    productApi,
    filtered,
    debounceChange,
    handleSaleCheck,
    handlePriceChange,
    handleOrderChange,
    saleChecked,
    price,
    order,
}) => {
    const orderFilterOpt = [
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
                        <div
                            className="FiltersInputs"
                            style={{ maxHeight: showFilter && '160px' }}
                        >
                            <input
                                className="NameFilterInput"
                                type="text"
                                name="searchkw"
                                id="searchkw"
                                title={`Enter some product's character Ex: vitamin, detox etc`}
                                placeholder="Search"
                                onChange={debounceChange}
                            />
                            <div className="SaleCheckBox">
                                <input
                                    type="checkbox"
                                    name="onSale"
                                    id="onSale"
                                    title="Show only on-sale Products"
                                    checked={saleChecked || false}
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
                                    value={price || 'Default'}
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
                                    htmlFor="orderFilter"
                                    title="Order Products"
                                >
                                    Order-by:{' '}
                                </label>
                                <select
                                    id="orderFilter"
                                    className="orderFilter"
                                    title="Order Products"
                                    value={order || 'Default'}
                                    onChange={(event) =>
                                        handleOrderChange(event)
                                    }
                                >
                                    {orderFilterOpt.map((opt) => (
                                        <option
                                            disabled={order === opt.label}
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
                        <button
                            type="button"
                            className="ToggleFilter__Btn"
                            style={{
                                background: showFilter
                                    ? 'var(--color-primary-rgba-7)'
                                    : 'var(--color-primary)',
                            }}
                            title={
                                showFilter
                                    ? 'Hide filter options'
                                    : 'Show detail filter options'
                            }
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            {showFilter ? 'Hide Filter' : 'Filter'}
                        </button>
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
            </div>
            <div>
                {filtered?.length === 0 && (
                    <img
                        className="NoItemImg"
                        src={noitem}
                        alt="NoItemFound"
                        loading="lazy"
                    />
                )}
            </div>
        </>
    );
};

const Shop = () => {
    const [searchParams, setSearchParams] = useSearchParams({
        searchquery: '',
        saleChecked: false,
        price: 'Default',
        order: 'Default',
    });
    const searchquery = searchParams.get('searchquery');
    const saleChecked = searchParams.get('saleChecked') === 'true';
    const price = searchParams.get('price');
    const order = searchParams.get('order');
    const [productApi, setProductApi] = useState([]);
    const [searchValue, setSearchValue] = useState(searchquery);
    const [onSale, setOnSale] = useState(saleChecked);
    const [priceFilter, setPriceFilter] = useState(price);
    const [orderFilter, setOrderFilter] = useState(order);
    const result = [...productApi];

    const getFilterItems = (
        searchValue,
        result,
        onSale,
        orderFilter,
        priceFilter
    ) => {
        const searchByName = result.filter((product) => {
            const query = searchValue?.replace(/\s+/g, '').toLowerCase();
            const productName = product.name.replace(/\s+/g, '').toLowerCase();
            return productName.includes(query);
        });
        const saleOnly = result.filter((product) => product.sale === true);
        const searchByNameSale = searchByName.filter(
            (product) => product.sale === true
        );
        //default
        if (orderFilter === 'Default' && priceFilter === 'Default') {
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
        //orderFilter
        if (orderFilter !== 'Default' && priceFilter === 'Default') {
            switch (orderFilter !== 'Default') {
                case !searchValue && onSale:
                    switch (true) {
                        case orderFilter === 'PriceUp':
                            return saleOnly.toSorted(
                                (a, b) => a.price - b.price
                            );
                        case orderFilter === 'PriceDown':
                            return saleOnly.toSorted(
                                (a, b) => b.price - a.price
                            );
                        case orderFilter === 'NameUp':
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
                        case orderFilter === 'NameDown':
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
                        case orderFilter === 'PriceUp':
                            return searchByName.toSorted(
                                (a, b) => a.price - b.price
                            );
                        case orderFilter === 'PriceDown':
                            return searchByName.toSorted(
                                (a, b) => b.price - a.price
                            );
                        case orderFilter === 'NameUp':
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
                        case orderFilter === 'NameDown':
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
                        case orderFilter === 'PriceUp':
                            return searchByNameSale.toSorted(
                                (a, b) => a.price - b.price
                            );
                        case orderFilter === 'PriceDown':
                            return searchByNameSale.toSorted(
                                (a, b) => b.price - a.price
                            );
                        case orderFilter === 'NameUp':
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
                        case orderFilter === 'NameDown':
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
                        case orderFilter === 'PriceUp':
                            return result.toSorted((a, b) => a.price - b.price);
                        case orderFilter === 'PriceDown':
                            return result.toSorted((a, b) => b.price - a.price);
                        case orderFilter === 'NameUp':
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
                        case orderFilter === 'NameDown':
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
        if (orderFilter === 'Default' && priceFilter !== 'Default') {
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
        //order&price
        if (orderFilter !== 'Default' && priceFilter !== 'Default') {
            //
            if (!searchValue && !onSale) {
                if (orderFilter === 'PriceUp') {
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
                } else if (orderFilter === 'PriceDown') {
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
                } else if (orderFilter === 'NameUp') {
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
                } else if (orderFilter === 'NameDown') {
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
                if (orderFilter === 'PriceUp') {
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
                } else if (orderFilter === 'PriceDown') {
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
                            .toOrdered((a, b) => b.price - a.price);
                    }
                } else if (orderFilter === 'NameUp') {
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
                } else if (orderFilter === 'NameDown') {
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
                if (orderFilter === 'PriceUp') {
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
                } else if (orderFilter === 'PriceDown') {
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
                } else if (orderFilter === 'NameUp') {
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
                } else if (orderFilter === 'NameDown') {
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
                if (orderFilter === 'PriceUp') {
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
                } else if (orderFilter === 'PriceDown') {
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
                } else if (orderFilter === 'NameUp') {
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
                } else if (orderFilter === 'NameDown') {
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
        orderFilter,
        priceFilter
    );

    const getProducts = async () => {
        let result = await fetchProductApi();

        if (result) {
            setProductApi(result);
        }
    };

    const handleNameChange = useCallback(
        (event) => {
            setSearchValue(event.target.value);
            setSearchParams((pre) => {
                pre.set('searchquery', event.target.value);
                return pre;
            });
        },
        [setSearchParams, setSearchValue]
    );

    const debounceChange = useMemo(
        () => debounce(handleNameChange, 500),
        [handleNameChange]
    );

    const handleSaleCheck = (event) => {
        setOnSale(event.target.checked);
        setSearchParams((pre) => {
            pre.set('saleChecked', event.target.checked);
            return pre;
        });
    };

    const handlePriceChange = (event) => {
        setPriceFilter(event.target.value);
        setSearchParams((pre) => {
            pre.set('price', event.target.value);
            return pre;
        });
    };

    const handleOrderChange = (event) => {
        setOrderFilter(event.target.value);
        setSearchParams((pre) => {
            pre.set('order', event.target.value);
            return pre;
        });
    };

    useEffect(() => {
        document.title = 'Gumi Shopify - Shop';
        getProducts();

        return () => {
            document.title = 'Gumi Shopify';
            debounceChange.cancel();
        };
        // eslint-disable-next-line
    }, []);

    return (
        <div className="Shop">
            <ShopFilter
                productApi={productApi}
                filtered={filtered}
                debounceChange={debounceChange}
                handleSaleCheck={handleSaleCheck}
                handlePriceChange={handlePriceChange}
                handleOrderChange={handleOrderChange}
                searchquery={searchValue}
                saleChecked={saleChecked}
                price={price}
                order={order}
            />
            <div className="Container">
                {productApi.length !== 0 ? (
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
