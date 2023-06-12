import './NavBar.css';
//
import { nav_Items } from '../../../../data/nav_Items';
//
import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { debounce } from 'lodash';
//
import { fetchProductApi } from '../../../../data/axiosAPI/productData';
//
import { useSelector } from 'react-redux';
import { myCartSelector } from '../../../../redux/Selectors/Selector';

const NavBar = () => {
    const myCart = useSelector(myCartSelector);
    const [isClicked, setIsClicked] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [productApi, setProductApi] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const result = [...productApi];

    const mq = window.matchMedia('(min-width: 1025px)');

    // toggle khi matchMedia '(min-width: 1025px)'
    const toggle = () => {
        if (mq.matches) {
            setIsClicked(false);
            setMenuVisible(false);
        }
    };

    //đóng MobileMenu khi nhấn ra ngoài
    useEffect(() => {
        if (isClicked) {
            setMenuVisible(true);
        } else {
            setMenuVisible(false);
        }

        const mobileMenu = document.getElementById('MobileMenu');

        const checkMenuDimension = (event) => {
            const mbDimensons = mobileMenu.getBoundingClientRect();
            if (
                (event.clientX < mbDimensons.left ||
                    event.clientX > mbDimensons.right ||
                    event.clientY < mbDimensons.top ||
                    event.clientY > mbDimensons.bottom) &&
                isClicked
            ) {
                setIsClicked(false);
                // hạn chế gọi hàm
                window.removeEventListener('click', checkMenuDimension);
            }
        };

        window.addEventListener('click', checkMenuDimension);
    }, [isClicked]);

    //đóng Search Modal khi nhấn ra ngoài
    useEffect(() => {
        const searchIcon = document.getElementById('SearchIcon');
        const searchModal = document.getElementById('searchquery');

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

    useEffect(() => {
        toggle();

        mq.addListener(toggle);

        return () => mq.removeListener(toggle);
    });

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

    return (
        <>
            <nav
                className='NavBar'
                style={{
                    backgroundColor: isClicked && 'var(--color-default)',
                }}
            >
                <button
                    id='MobileMenu'
                    className='MobileMenu'
                    onClick={() => setIsClicked(!isClicked)}
                    aria-label='MobileMenuToggle'
                    style={{
                        backgroundColor: isClicked && 'rgba(0, 0, 0, 0.3)',
                    }}
                >
                    <div
                        className='MenuIcon1 MenuIcon '
                        style={
                            isClicked
                                ? {
                                      backgroundColor: 'var(--color-default)',
                                      transform:
                                          'rotate(45deg) translateX(1px) translateY(-5px)',
                                  }
                                : null
                        }
                    ></div>
                    <div
                        className='MenuIcon2 MenuIcon '
                        style={{
                            display: isClicked && 'none',
                        }}
                    ></div>
                    <div
                        className='MenuIcon3 MenuIcon '
                        style={
                            isClicked
                                ? {
                                      backgroundColor: 'var(--color-default)',
                                      width: '30px',
                                      transform:
                                          'rotate(-45deg) translateX(1px) translateY(5px)',
                                  }
                                : null
                        }
                    ></div>
                </button>
                <NavLink to='/'>
                    <h1 className='NavBar__Logo'>
                        GOOD<span>4</span>ME.
                    </h1>
                </NavLink>
                <div className='NavBar__List'>
                    {nav_Items.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            className={({ isActive }) =>
                                isActive ? 'active' : 'inactive'
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
                <div className='SearchCart'>
                    <label
                        id='SearchIcon'
                        htmlFor='searchquery'
                        onClick={() => setIsSearching(!isSearching)}
                    >
                        <i className='fa-solid fa-magnifying-glass Icon'></i>
                    </label>
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
            </nav>
            <div
                className='Nav-Search'
                style={{ display: isSearching && 'block' }}
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
                        />
                        <button
                            type='reset'
                            onClick={() => setSearchValue('')}
                        >
                            X
                        </button>
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
            <div
                className={
                    menuVisible
                        ? 'MobileMenu__NavBar-actived'
                        : 'MobileMenu__NavBar'
                }
            >
                {nav_Items.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.name}
                        className='MobileMenu__Item'
                        onClick={() => setIsClicked(false)}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </>
    );
};

export default NavBar;
