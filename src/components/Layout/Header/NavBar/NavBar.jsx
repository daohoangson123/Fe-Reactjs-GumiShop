import './NavBar.css';
//
import { nav_Items } from '../../../../data/nav_Items';
//
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
//
import { useSelector } from 'react-redux';
import { myCartSelector } from '../../../../redux/Selectors/Selector';

const NavBar = () => {
    const myCart = useSelector(myCartSelector);
    const [isClicked, setIsClicked] = useState(false);

    const mq = window.matchMedia('(min-width: 1025px)');

    const [menuVisible, setMenuVisible] = useState(false);

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

        const checkDimension = (event) => {
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
                window.removeEventListener('click', checkDimension);
            }
        };

        window.addEventListener('click', checkDimension);
    }, [isClicked]);

    useEffect(() => {
        toggle();

        mq.addListener(toggle);

        return () => mq.removeListener(toggle);
    });

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
