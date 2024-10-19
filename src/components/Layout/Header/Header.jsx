import './Header.css';
//
import SignBar from './SignBar/SignBar';
import NavBar from './NavBar/NavBar';
//
import { pageAccessedByReload } from '../../../data/isPageReloaded';
//
import { useState, useCallback, useEffect } from 'react';

const Header = ({ isSignIn }) => {
    const [y, setY] = useState(window.scrollY);
    const [isDown, setIsDown] = useState();

    const handleNavigation = useCallback(
        (e) => {
            const window = e.currentTarget;
            if (y > window.scrollY) {
                setIsDown(false);
            } else if (y < window.scrollY) {
                setIsDown(true);
            }
            setY(window.scrollY);
        },
        [y]
    );

    useEffect(() => {
        setY(window.scrollY);

        window.addEventListener('scroll', handleNavigation);

        return () => {
            window.removeEventListener('scroll', handleNavigation);
        };
    }, [handleNavigation]);

    const [isMobileView, setIsMobileView] = useState(false);

    const mq = window.matchMedia('(width <= 1024px)');

    // toggle khi matchMedia
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

    return (
        <header
            style={{
                animation: pageAccessedByReload && 'none',
                top: isDown && !isMobileView ? '-60px' : 0,
            }}
        >
            <SignBar isSignIn={isSignIn} />
            <NavBar />
        </header>
    );
};

export default Header;
