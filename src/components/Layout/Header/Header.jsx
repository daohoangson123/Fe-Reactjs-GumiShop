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
            if (y > window.scrollY && y - window.scrollY > 35) {
                setIsDown(false);
            } else if (y < window.scrollY && window.scrollY - y > 40) {
                setIsDown(true);
            }
            setY(window.scrollY);
        },
        [y],
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
                animation: pageAccessedByReload && 'none',
                top: isDown ? '-60px' : 0,
            }}
        >
            <SignBar isSignIn={isSignIn} />
            <NavBar />
        </header>
    );
};

export default Header;
