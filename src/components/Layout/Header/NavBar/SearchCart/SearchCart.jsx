import './SearchCart.css';
//
import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { debounce } from 'lodash';
//
import { fetchProductApi } from '../../../../../data/axiosAPI/productData';
//
import { useSelector } from 'react-redux';
import {
    myCartSelector,
    signinSelector,
} from '../../../../../redux/Selectors/Selector';
//

const SearchModal = ({
    isSearching,
    setIsSearching,
    debounceChange,
    searchValue,
    filtered,
}) => {
    return (
        <div
            className='NavSearch'
            style={
                !isSearching
                    ? { maxHeight: 0, overflow: 'hidden', opacity: 0 }
                    : {
                          maxHeight: '300px',
                          marginTop: '10px',
                          paddingBlock: '10px',
                          opacity: 1,
                      }
            }
        >
            <form className='NavSearch__Form'>
                <input
                    type='text'
                    name='searchquery'
                    id='searchquery'
                    placeholder="Search by Product's name"
                    required
                    autoComplete='off'
                    onChange={debounceChange}
                />
            </form>
            {searchValue && (
                <div style={{ marginTop: '10px' }}>
                    {filtered.length} item
                    {filtered.length > 1 && `s`} found
                </div>
            )}
            <ul
                className='NavSearch__Result'
                style={
                    searchValue ? { display: 'grid', maxHeight: '400px' } : null
                }
            >
                {filtered
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
                                    alt=''
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
        setSearchValue(event.target.value);
    };

    const debounceChange = useMemo(() => debounce(handleChange, 500), []);

    const getFilterItems = (searchValue, result) => {
        const query = searchValue.replace(/\s+/g, '').toLowerCase();
        if (!query) {
            return [];
        }
        return result.filter((product) => {
            const productName = product.name.replace(/\s+/g, '').toLowerCase();
            const productList = productName.includes(query);
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
        getProducts();

        return () => {
            debounceChange.cancel();
        };
    }, [debounceChange]);

    //đóng Search Modal khi nhấn ra ngoài
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
                // hạn chế gọi hàm
                window.removeEventListener('click', checkSearchDimension);
            }
        };

        window.addEventListener('click', checkSearchDimension);
    }, [isSearching]);

    return (
        <>
            <div className='SearchCart'>
                <button
                    type='button'
                    aria-label='SearchProduct'
                    id='SearchIcon'
                    htmlFor='searchquery'
                    title='Search product'
                    onClick={() => setIsSearching(!isSearching)}
                >
                    <i className='fa-solid fa-magnifying-glass Icon'></i>
                </button>
                {!isSignIn ? (
                    <NavLink
                        to='/userSignIn'
                        aria-label='User-Page'
                        title='UserSignIn'
                    >
                        <i className='fa-regular fa-user Icon NavBar__UserIcon'></i>
                    </NavLink>
                ) : (
                    <NavLink
                        to='/userProfile'
                        aria-label='User-Page'
                        title='User'
                    >
                        <i className='fa-regular fa-user Icon NavBar__UserIcon'></i>
                    </NavLink>
                )}
                <NavLink
                    to='/cart'
                    aria-label='Cart-Page'
                    title='Your Cart'
                >
                    <div className='Cart_IconContainer'>
                        <i className='fa-solid fa-bag-shopping Icon'></i>
                        {myCart.length !== 0 && (
                            <div className='Cart_Notify'>
                                <div className='Cart_Notify-Number'>
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
                debounceChange={debounceChange}
                searchValue={searchValue}
                filtered={filtered}
            />
        </>
    );
};

export default SearchCart;
