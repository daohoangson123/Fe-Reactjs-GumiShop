import './Header.css';
//
import SignBar from './SignBar/SignBar';
import NavBar from './NavBar/NavBar';
//
import { pageAccessedByReload } from '../../../data/isPageReloaded';
//
import { useEffect, useState } from 'react';

const Header = ({ isSignIn }) => {
    const [isUp, setIsUp] = useState(false);

    useEffect(() => {
        var lastScroll = window.screenY || document.documentElement.scrollTop;

        function checkDown() {
            var currentScroll =
                window.screenY || document.documentElement.scrollTop;
            if (currentScroll > lastScroll) {
                setIsUp(false);
                setIsDown(true);
                window.addEventListener('scroll', checkUp);
                window.removeEventListener('scroll', checkDown);
                console.log('down');
            }
            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        }

        function checkUp() {
            var currentScroll =
                window.scrollY || document.documentElement.scrollTop;
            if (currentScroll < lastScroll && window.innerWidth > 1024) {
                setIsUp(true);
                setIsDown(false);
                window.addEventListener('scroll', checkDown);
                console.log('up');
            }
            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        }

        window.addEventListener('scroll', checkDown);
        window.addEventListener('scroll', checkUp);

        return () => {
            window.removeEventListener('scroll', checkDown);
            window.removeEventListener('scroll', checkUp);
        };
    }, [isUp]);

    const [isDown, setIsDown] = useState(false);

    //Nav SideEff khi scroll
    // useEffect(() => {
    //     function checkNavDown() {
    //         if (window.scrollY > 0) {
    //             setIsDown(true);
    //         } else {
    //             setIsDown(false);
    //         }
    //     }

    //     window.addEventListener('scroll', checkNavDown);

    //     return () => {
    //         window.removeEventListener('scroll', checkNavDown);
    //     };
    // }, [isDown]);

    const mq = window.matchMedia('(width <= 1024px)');

    const [isMobileView, setIsMobileView] = useState(false);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <header
            style={{
                animation: pageAccessedByReload && 'none',
                // top: isDown && '-55px',
                transition: isDown && 'none',
                boxShadow: isDown
                    ? '0 2px 2px 2px var(--color-alt-rgba-3)'
                    : null,
                position: isUp ? 'sticky' : 'relative',
            }}
        >
            <SignBar isSignIn={isSignIn} />
            <NavBar
                isMobileView={isMobileView}
                isSignIn={isSignIn}
            />
        </header>
    );
};

export default Header;
