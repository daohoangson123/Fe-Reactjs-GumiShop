import './SearchCart.css';
//
import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { debounce } from 'lodash';
//
import { fetchProductApi } from '../../../../../data/axiosAPI/productData';
//
import { useSelector } from 'react-redux';
import { myCartSelector } from '../../../../../redux/Selectors/Selector';
//

const SearchModal = ({
    isSearching,
    debounceChange,
    searchValue,
    filtered,
}) => {
    return (
        <div
            className='Nav-Search'
            style={{ scale: isSearching && '1' }}
        >
            <form className='Nav-Search-Form'>
                <div className='Nav-Search-Container'>
                    <input
                        type='text'
                        name='searchquery'
                        id='searchquery'
                        placeholder="Search by Product's name"
                        required
                        autoComplete='off'
                        onChange={debounceChange}
                        onFocus={() => console.log(123)}
                        onBlur={() => console.log(456)}
                    />
                    <ul className='Nav-Search__Result'>
                        <div style={{ textAlign: 'center' }}>
                            {searchValue ? (
                                <>
                                    {filtered.length} item
                                    {filtered.length > 1 && `'s`} found
                                </>
                            ) : (
                                'result will be show here'
                            )}
                        </div>
                        {filtered.map((product) => (
                            <li key={product.name}>
                                <Link
                                    to={`/shop/${product.name
                                        .split(' ')
                                        .join('-')}`}
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
            </form>
        </div>
    );
};

const SearchCart = () => {
    const myCart = useSelector(myCartSelector);
    const [isSearching, setIsSearching] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [productApi, setProductApi] = useState([]);
    const result = [...productApi];

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    const debounceChange = useMemo(() => debounce(handleChange, 500), []);

    const getFilterItems = (searchValue, result) => {
        const query = searchValue.replace(/\s+/g, '').toLocaleLowerCase();
        if (!searchValue.trim()) {
            return [];
        }
        return result.filter((product) => {
            const productName = product.name
                .replace(/\s+/g, '')
                .toLocaleLowerCase();
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
        const searchModal = document.getElementById('searchquery');

        function focusSearchInput() {
            if (!isSearching) {
                searchModal.focus();
                searchIcon.removeEventListener('click', focusSearchInput);
            } else {
                searchModal.blur();
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
                <div
                    id='SearchIcon'
                    htmlFor='searchquery'
                    onClick={() => setIsSearching(!isSearching)}
                >
                    <i className='fa-solid fa-magnifying-glass Icon'></i>
                </div>
                <NavLink
                    to='/userLogin'
                    aria-label='User-Page'
                >
                    <i className='fa-regular fa-user Icon NavBar__UserIcon'></i>
                </NavLink>
                <NavLink
                    to='/cart'
                    aria-label='Cart-Page'
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
                debounceChange={debounceChange}
                searchValue={searchValue}
                filtered={filtered}
            />
        </>
    );
};

export default SearchCart;
