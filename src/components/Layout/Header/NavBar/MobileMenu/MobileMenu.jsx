import './MobileMenu.css';
//
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks,
} from 'body-scroll-lock';

const MobileMenu = ({ navlinkData }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    const openMenu =
        typeof document !== 'undefined' &&
        document.querySelector('#MobileMenu');

    const mq = window.matchMedia('(width <= 1024px)');

    // toggle khi matchMedia
    const checkView = () => {
        if (mq.matches) {
            setMenuOpen(false);
            setIsMobileView(true);
            clearAllBodyScrollLocks();
        } else {
            setIsMobileView(false);
            setMenuOpen(false);
            clearAllBodyScrollLocks();
        }
    };

    useEffect(() => {
        checkView();

        mq.addEventListener('change', checkView);

        return () => {
            mq.removeEventListener('change', checkView);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <MobileMenuToggle
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                openMenu={openMenu}
            />

            <MobileMenuRouting
                isMobileView={isMobileView}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                navlinkData={navlinkData}
                openMenu={openMenu}
            />
        </>
    );
};

const MobileMenuRouting = ({
    isMobileView,
    menuOpen,
    setMenuOpen,
    navlinkData,
    openMenu,
}) => {
    // const menuRef = useRef();
    //run on mousedown so user just click but not release imediately it cause the link wont be press
    // useEffect(() => {
    //     const toggleBodyLock = (event) => {
    //         if (menuRef.current.contains(event.target)) {
    //             clearAllBodyScrollLocks();
    //             setMenuOpen(false);
    //         }
    //     };

    //     menuRef.current.addEventListener('mousedown', toggleBodyLock);
    // });

    useEffect(() => {
        const mobileMenu = document.getElementById('MobileMenu');
        const checkMenuDimension = (event) => {
            const mbDimensons = mobileMenu.getBoundingClientRect();
            if (
                (event.clientX < mbDimensons.left ||
                    event.clientX > mbDimensons.right ||
                    event.clientY < mbDimensons.top ||
                    event.clientY > mbDimensons.bottom) &&
                menuOpen
            ) {
                setMenuOpen(false);
                enableBodyScroll(openMenu);
                window.removeEventListener('click', checkMenuDimension);
            }
        };
        window.addEventListener('click', checkMenuDimension);
    });

    return (
        <div
            className="MobileMenu__NavContainer"
            title="Close Menu"
            style={
                menuOpen
                    ? {
                          transform: 'none',
                          zIndex: 1000,
                          //   backgroundColor: 'var(--color-alt-rgba-5)',
                      }
                    : !isMobileView
                      ? { transition: 'none' }
                      : null
            }
        >
            <div className="BlurBg"></div>
            <div className="MobileMenu__Nav">
                {navlinkData.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.name}
                        className="MobileMenu__Item"
                        title={item.name}
                        tabIndex={!isMobileView || !menuOpen ? -1 : 0}
                        onClick={() => {
                            setMenuOpen(false);
                            clearAllBodyScrollLocks();
                        }}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

const MobileMenuToggle = ({ menuOpen, setMenuOpen, openMenu }) => {
    return (
        <button
            title={menuOpen ? 'Close Menu' : 'Open Menu'}
            type="button"
            className="MobileMenu"
            id="MobileMenu"
            onClick={() => {
                setMenuOpen(!menuOpen);
                if (menuOpen) {
                    enableBodyScroll(openMenu);
                } else {
                    disableBodyScroll(openMenu);
                }
            }}
            aria-label="MobileMenuToggle"
            style={{
                backgroundColor: menuOpen && 'rgba(0, 0, 0, 0.3)',
                zIndex: menuOpen && 9999,
            }}
        >
            <div
                className="MenuIcon1 MenuIcon "
                style={
                    menuOpen
                        ? {
                              backgroundColor: 'var(--color-default)',
                              transform:
                                  'rotate(45deg) translateX(1px) translateY(-5px)',
                          }
                        : null
                }
            ></div>
            <div
                className="MenuIcon2 MenuIcon"
                style={{
                    display: menuOpen && 'none',
                }}
            ></div>
            <div
                className="MenuIcon3 MenuIcon "
                style={
                    menuOpen
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
    );
};

export default MobileMenu;
