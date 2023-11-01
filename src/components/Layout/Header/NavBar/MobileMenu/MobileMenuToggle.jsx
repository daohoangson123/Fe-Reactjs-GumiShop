import './MobileMenuToggle.css';
//
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const MobileMenuRouting = ({
    isMobileView,
    menuVisible,
    setMenuOpen,
    navlinkData,
}) => {
    return (
        <div
            className='MobileMenu__NavContainer'
            style={{
                height: menuVisible && '100vh',
            }}
        >
            <div
                className='MobileMenu__Nav'
                style={{ transition: !isMobileView && 'none' }}
            >
                {navlinkData.map((item) => (
                    <NavLink
                        to={item.path}
                        key={item.name}
                        className='MobileMenu__Item'
                        onClick={() => setMenuOpen(false)}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

const MobileMenuToggle = ({ isMobileView, navlinkData }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const mq = window.matchMedia('(min-width: 1025px)');

    // toggle khi matchMedia '(min-width: 1025px)'
    const toggle = () => {
        if (mq.matches) {
            setMenuOpen(false);
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        toggle();

        mq.addEventListener('change', toggle);

        return () => mq.removeEventListener('change', toggle);
    }, []);

    //đóng MobileMenu khi nhấn ra ngoài
    useEffect(() => {
        if (menuOpen) {
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
                menuOpen
            ) {
                setMenuOpen(false);
                // hạn chế gọi hàm
                window.removeEventListener('click', checkMenuDimension);
            }
        };

        window.addEventListener('click', checkMenuDimension);
    }, [menuOpen]);

    return (
        <>
            <abbr
                title='Menu'
                className='MobileMenu'
                id='MobileMenu'
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label='MobileMenuToggle'
                style={{
                    backgroundColor: menuOpen && 'rgba(0, 0, 0, 0.3)',
                }}
            >
                <div
                    className='MenuIcon1 MenuIcon '
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
                    className='MenuIcon2 MenuIcon'
                    style={{
                        display: menuOpen && 'none',
                    }}
                ></div>
                <div
                    className='MenuIcon3 MenuIcon '
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
            </abbr>
            <MobileMenuRouting
                isMobileView={isMobileView}
                menuVisible={menuVisible}
                setMenuOpen={setMenuOpen}
                navlinkData={navlinkData}
            />
        </>
    );
};

export default MobileMenuToggle;
