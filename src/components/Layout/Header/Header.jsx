import './Header.css';
//
import SignBar from './SignBar/SignBar';
import NavBar from './NavBar/NavBar';
//
import { pageAccessedByReload } from '../../../data/isPageReloaded';
//
import { useEffect, useState } from 'react';

const Header = ({ isSignIn }) => {
    const [isUp, setIsUp] = useState(true);
    const [isDown, setIsDown] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const mq = window.matchMedia('(width <= 1024px)');

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

        return () => mq.removeEventListener('change', checkView);
    });

    useEffect(() => {
        let lastScroll = window.screenY || document.documentElement.scrollTop;

        function checkDown() {
            let currentScroll =
                window.screenY || document.documentElement.scrollTop;
            if (currentScroll > lastScroll) {
                setIsUp(false);
                setIsDown(true);
                window.addEventListener('scroll', checkUp);
                window.removeEventListener('scroll', checkDown);
            }
            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        }

        function checkUp() {
            let currentScroll =
                window.scrollY || document.documentElement.scrollTop;
            if (currentScroll < lastScroll) {
                setIsUp(true);
                setIsDown(false);
                window.addEventListener('scroll', checkDown);
                window.removeEventListener('scroll', checkUp);
            }
            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        }

        window.addEventListener('scroll', checkDown);
        window.addEventListener('scroll', checkUp);

        return () => {
            window.removeEventListener('scroll', checkDown);
            window.removeEventListener('scroll', checkUp);
        };
    }, [isDown, isUp]);

    return (
        <header
            style={{
                animation: pageAccessedByReload && 'none',
                top: isDown && !isMobileView ? '-55px' : 0,
            }}>
            <SignBar isSignIn={isSignIn} />
            <NavBar
                isMobileView={isMobileView}
                isSignIn={isSignIn}
            />
        </header>
    );
};

export default Header;
