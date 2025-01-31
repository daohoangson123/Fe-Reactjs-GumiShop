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
        document.getElementById('MobileMenu__Btn');

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
            {menuOpen && (
                <MobileMenuRouting
                    isMobileView={isMobileView}
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    navlinkData={navlinkData}
                    openMenu={openMenu}
                />
            )}
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
    useEffect(() => {
        const mobileMenu = document.getElementById('MobileMenu__Btn');
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
            className={`MobileMenu__NavContainer ${menuOpen ? 'MobileMenu__NavContainer--Opened' : 'MobileMenu__NavContainer--Closed'}`}
            title="Close Menu"
        >
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
            className={`MobileMenu__Btn ${menuOpen && 'MobileMenu__Btn--Actived'}`}
            id="MobileMenu__Btn"
            onClick={() => {
                setMenuOpen(!menuOpen);
                if (menuOpen) {
                    enableBodyScroll(openMenu);
                } else {
                    disableBodyScroll(openMenu);
                }
            }}
            aria-label="MobileMenuToggle"
        >
            <div
                className={`MenuIcon1 MenuIcon ${menuOpen ? 'MenuIcon1--Actived' : 'MenuIcon1--NotActived'}`}
            ></div>
            <div
                className={`MenuIcon2 MenuIcon ${menuOpen ? 'MenuIcon2--Actived' : 'MenuIcon2--NotActived'}`}
            ></div>
            <div
                className={`MenuIcon3 MenuIcon ${menuOpen ? 'MenuIcon3--Actived' : 'MenuIcon3--NotActived'}`}
            ></div>
        </button>
    );
};

export default MobileMenu;
