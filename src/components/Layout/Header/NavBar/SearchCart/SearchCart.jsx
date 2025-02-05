import './SearchCart.css';
//
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
//
import { fetchProductApi } from '../../../../../data/axiosAPI/productData';
//
import { useSelector } from 'react-redux';
import {
    myCartSelector,
    signinSelector,
} from '../../../../../redux/Selectors/Selector';
import Loading from '../../../UI/Loading/Loading';
//

const SearchModal = ({
    isSearching,
    setIsSearching,
    handleChange,
    searchValue,
    filtered,
    productData,
}) => {
    const handleSearchSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <div
            className="NavSearch"
            style={
                isSearching && filtered.length > 0
                    ? {
                          height: 'calc(100lvh - 74px)',
                      }
                    : isSearching && filtered.length === 0
                      ? {
                            height: '80px',
                        }
                      : null
            }
        >
            <form className="NavSearch__Form" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    name="searchquery"
                    id="searchquery"
                    placeholder="Search by Product's name"
                    required
                    autoComplete="off"
                    onChange={handleChange}
                />
                <div className="NavSearch__Form--Text">
                    {!searchValue ? (
                        <span>Please type in product's name</span>
                    ) : searchValue && productData.length === 0 ? (
                        <Loading />
                    ) : (
                        <span>
                            {filtered.length} item
                            {filtered.length > 1 && `s`} found
                        </span>
                    )}
                </div>
            </form>
            <ul className="NavSearch__Result">
                {filtered
                    .sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    })
                    .map((product) => (
                        <li
                            key={product._id}
                            onClick={() => setIsSearching(false)}
                        >
                            <Link
                                to={`/shop/${product.name
                                    .split(' ')
                                    .join('-')}`}
                                title={product.name}
                            >
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    loading="lazy"
                                />
                                {product.name}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

const SearchCart = () => {
    const myCart = useSelector(myCartSelector);
    const isSignIn = useSelector(signinSelector);
    const [isSearching, setIsSearching] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [productApi, setProductApi] = useState([]);
    const result = [...productApi];

    const handleChange = (event) => {
        setSearchValue(event.target.value.replace(/\s+/g, '').toLowerCase());
    };

    const getFilterItems = (searchValue, result) => {
        if (!searchValue) {
            return [];
        }
        return result.filter((product) => {
            const productName = product.name.replace(/\s+/g, '').toLowerCase();
            const productList = productName.includes(searchValue);
            return productList;
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
        searchValue && getProducts();
    }, [searchValue]);

    useEffect(() => {
        const searchIcon = document.getElementById('SearchIcon');
        const searchInput = document.getElementById('searchquery');
        const searchModal = document.getElementsByClassName('NavSearch')[0];

        function focusSearchInput() {
            if (!isSearching) {
                setTimeout(() => searchInput.focus(), 0);
                searchIcon.removeEventListener('click', focusSearchInput);
            } else {
                searchInput.blur();
            }
        }

        searchIcon.addEventListener('click', focusSearchInput);

        const checkSearchDimension = (event) => {
            const smDimensons = searchModal.getBoundingClientRect();
            const smIDimensons = searchIcon.getBoundingClientRect();
            if (
                (event.clientX < smDimensons.left ||
                    event.clientX > smDimensons.right ||
                    event.clientY < smDimensons.top ||
                    event.clientY > smDimensons.bottom) &&
                isSearching &&
                (event.clientX < smIDimensons.left ||
                    event.clientX > smIDimensons.right ||
                    event.clientY < smIDimensons.top ||
                    event.clientY > smIDimensons.bottom) &&
                isSearching
            ) {
                setIsSearching(false);
                window.removeEventListener('click', checkSearchDimension);
            }
        };

        window.addEventListener('click', checkSearchDimension);
    }, [isSearching]);

    return (
        <>
            <div className="SearchCart">
                <button
                    type="button"
                    aria-label="SearchProduct"
                    id="SearchIcon"
                    htmlFor="searchquery"
                    title="Search product"
                    onClick={() => setIsSearching(!isSearching)}
                >
                    <svg
                        width="20"
                        height="24"
                        viewBox="0 -2 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M21.7312 20.4352L15.475 14.179C16.6868 12.6821 17.4165 10.78 17.4165 8.70842C17.4165 3.90696 13.5097 0.000152588 8.70822 0.000152588C3.90677 0.000152588 0 3.90692 0 8.70837C0 13.5098 3.90681 17.4166 8.70826 17.4166C10.7799 17.4166 12.682 16.687 14.1789 15.4752L20.4351 21.7313C20.6138 21.9101 20.8484 21.9999 21.0831 21.9999C21.3178 21.9999 21.5525 21.9101 21.7312 21.7313C22.0896 21.3729 22.0896 20.7936 21.7312 20.4352ZM8.70826 15.5833C4.91695 15.5833 1.83333 12.4997 1.83333 8.70837C1.83333 4.91706 4.91695 1.83344 8.70826 1.83344C12.4996 1.83344 15.5832 4.91706 15.5832 8.70837C15.5832 12.4997 12.4995 15.5833 8.70826 15.5833Z"
                            fill={
                                isSearching ? 'var(--color-primary)' : '#000000'
                            }
                        />
                    </svg>
                </button>
                <NavLink
                    to={isSignIn ? '/user-profile' : '/user-signin'}
                    aria-label={isSignIn ? 'User Profile' : 'Sign In Page'}
                    title={isSignIn ? 'User Profile' : 'Sign In Page'}
                    className={({ isActive }) =>
                        isActive ? 'active' : 'inactive'
                    }
                >
                    <div className="Icon UserIcon ProfileIcon">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.4853 15.5147C19.1783 14.2077 17.6226 13.2402 15.9253 12.6545C17.7432 11.4024 18.9375 9.30694 18.9375 6.9375C18.9375 3.11217 15.8253 0 12 0C8.17467 0 5.0625 3.11217 5.0625 6.9375C5.0625 9.30694 6.25683 11.4024 8.07478 12.6545C6.37744 13.2402 4.82175 14.2077 3.51473 15.5147C1.24823 17.7812 0 20.7947 0 24H1.875C1.875 18.417 6.41705 13.875 12 13.875C17.583 13.875 22.125 18.417 22.125 24H24C24 20.7947 22.7518 17.7812 20.4853 15.5147ZM12 12C9.20855 12 6.9375 9.729 6.9375 6.9375C6.9375 4.146 9.20855 1.875 12 1.875C14.7915 1.875 17.0625 4.146 17.0625 6.9375C17.0625 9.729 14.7915 12 12 12Z"
                                fill="#000000"
                            />
                        </svg>
                    </div>
                </NavLink>
                <NavLink
                    to="/cart"
                    aria-label="Cart-Page"
                    title="Your Cart"
                    className={({ isActive }) =>
                        isActive ? 'active' : 'inactive'
                    }
                >
                    <div className="Cart_IconContainer">
                        <svg
                            width="20"
                            height="22"
                            viewBox="-2 0 20 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15.2523 6.64357H14.3686V5.3685C14.3685 2.40813 11.9602 0 8.99991 0C6.03966 0 3.63119 2.40847 3.63119 5.3685V6.64357H2.74748C1.31064 6.64357 0.141602 7.81261 0.141602 9.24944V21.3941C0.141602 22.8313 1.31064 24 2.74748 24H15.2522C16.6891 24 17.8581 22.8312 17.8581 21.3941V9.24944C17.8581 7.81261 16.6891 6.64357 15.2523 6.64357ZM5.33124 5.3685C5.33124 3.34569 6.97688 1.70005 8.99991 1.70005C11.0227 1.70005 12.6684 3.34569 12.6684 5.3685V6.64357H5.33124V5.3685ZM16.1582 21.3941C16.1582 21.894 15.7516 22.2999 15.2523 22.2999H2.74737C2.24787 22.2999 1.84154 21.8936 1.84154 21.3941V9.24944C1.84154 8.74994 2.24787 8.34361 2.74737 8.34361H3.63108V9.53567C3.35792 9.77363 3.18174 10.1202 3.18174 10.5112C3.18174 11.2289 3.76346 11.8109 4.48116 11.8109C5.19862 11.8109 5.78058 11.2289 5.78058 10.5112C5.78058 10.1205 5.60428 9.77397 5.33124 9.53567V8.34361H12.6684V9.53567C12.3952 9.77363 12.219 10.1202 12.219 10.5112C12.219 11.2289 12.8007 11.8109 13.5184 11.8109C14.2361 11.8109 14.8179 11.2289 14.8179 10.5112C14.8179 10.1205 14.6416 9.77363 14.3685 9.53567V8.34361H15.2522C15.7517 8.34361 16.1581 8.74994 16.1581 9.24944V21.3941H16.1582Z"
                                fill="#000000"
                            />
                        </svg>
                        {myCart.length !== 0 && (
                            <div className="Cart_Notify">
                                <div className="Cart_Notify-Number">
                                    {myCart.length}
                                </div>
                            </div>
                        )}
                    </div>
                </NavLink>
            </div>
            <SearchModal
                isSearching={isSearching}
                setIsSearching={setIsSearching}
                handleChange={handleChange}
                searchValue={searchValue}
                filtered={filtered}
                productData={result}
            />
        </>
    );
};

export default SearchCart;
