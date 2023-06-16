import './MobileMenuToggle.css';
//
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const MobileMenuRouting = ({ menuVisible, setIsClicked, navlinkData }) => {
    return (
        <div
            className={
                menuVisible ? 'MobileMenu__Nav active' : 'MobileMenu__Nav'
            }
        >
            {navlinkData.map((item) => (
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
    );
};

const MobileMenuToggle = ({ navlinkData }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const mq = window.matchMedia('(min-width: 1025px)');

    // toggle khi matchMedia '(min-width: 1025px)'
    const toggle = () => {
        if (mq.matches) {
            setIsClicked(false);
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        toggle();

        mq.addEventListener('change', toggle);

        return () => mq.removeEventListener('change', toggle);
    });

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

    return (
        <>
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
            <MobileMenuRouting
                menuVisible={menuVisible}
                setIsClicked={setIsClicked}
                navlinkData={navlinkData}
            />
        </>
    );
};

export default MobileMenuToggle;
