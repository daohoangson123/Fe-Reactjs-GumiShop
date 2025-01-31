import './Header.css';
//
import SignBar from './SignBar/SignBar';
import NavBar from './NavBar/NavBar';
//
import { useState, useCallback, useEffect } from 'react';

const Header = () => {
    const [y, setY] = useState(window.scrollY);
    const [isDown, setIsDown] = useState();
    const [isMobileView, setIsMobileView] = useState(false);

    const mq = window.matchMedia('(width <= 1024px)');

    // toggle matchMedia
    const checkView = () => {
        if (mq.matches) {
            setIsMobileView(true);
        } else {
            setIsMobileView(false);
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

    const handleNavigation = useCallback(
        (e) => {
            const window = e.currentTarget;
            if (y > window.scrollY && !isMobileView) {
                setIsDown(false);
            } else if (y < window.scrollY && !isMobileView) {
                setIsDown(true);
            }
            if (!isMobileView) {
                setY(window.scrollY);
            }
        },
        [y, isMobileView]
    );

    useEffect(() => {
        setY(window.scrollY);

        window.addEventListener('scroll', handleNavigation);

        return () => {
            window.removeEventListener('scroll', handleNavigation);
        };
    }, [handleNavigation]);

    return (
        <header
            style={{
                top: isDown && !isMobileView ? '-55px' : 0,
                transition: !isMobileView && isDown && 'none',
            }}
        >
            <SignBar isDown={isDown} />
            <NavBar isDown={isDown} />
        </header>
    );
};

export default Header;
