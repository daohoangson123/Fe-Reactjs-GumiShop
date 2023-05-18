import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { myCartSelector } from '../../../../Redux/Selectors/Selector';

const nav_Items = [
    {
        name: 'HOME',
        path: '/',
    },
    {
        name: 'SHOP',
        path: '/shop',
    },
    {
        name: "FAQ'S",
        path: '/faq',
    },
    {
        name: 'STOCKIST',
        path: '/stockist',
    },
    {
        name: 'WHOLESALE',
        path: '/wholesale',
    },
    {
        name: 'CONTACT',
        path: '/contact',
    },
];

const NavBar = () => {
    const [isClicked, setIsClicked] = useState(true);

    function handleClick() {
        if (isClicked) {
            setMenuvisible('MobileMenu__NavBar-actived');
        } else {
            setMenuvisible('MobileMenu__NavBar');
        }
        setIsClicked(!isClicked);
    }

    const myCart = useSelector(myCartSelector);
    const [menuvisible, setMenuvisible] = useState('MobileMenu__NavBar');

    const mq = window.matchMedia('(min-width: 1025px)');

    useEffect(() => {
        // initial check to toggle something on or off
        toggle();

        // returns true when window is => 1025px
        mq.addListener(toggle);

        // unmount cleanup handler
        return () => mq.removeListener(toggle);
    }, []);

    // toggle something based on matchMedia event
    const toggle = () => {
        if (mq.matches) {
            setMenuvisible('hideMobileMenu');
            setTimeout(() => setMenuvisible('MobileMenu__NavBar'), 0);
        }
    };
    return (
        <nav className='NavBar'>
            <button
                className='MobileMenu'
                onClick={handleClick}
                aria-label='MobileMenuToggle'
            >
                <div className='MenuIcon1 MenuIcon '></div>
                <div className='MenuIcon2 MenuIcon '></div>
                <div className='MenuIcon3 MenuIcon '></div>
            </button>
            <div className={menuvisible}>
                {nav_Items.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.name}
                        className='MobileMenu__Item'
                        onClick={handleClick}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
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
                <NavLink
                    to='/shop'
                    aria-label='Shopping-Page'
                >
                    <i className='fa-solid fa-magnifying-glass Icon'></i>
                </NavLink>
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
                        {myCart.length === 0 ? (
                            <></>
                        ) : (
                            <div className='Cart_Notify'>
                                <span>{myCart.length}</span>
                            </div>
                        )}
                    </div>
                </NavLink>
            </div>
        </nav>
    );
};

export default NavBar;
