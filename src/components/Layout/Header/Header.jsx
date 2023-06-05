import './Header.css';
//
import SignBar from './SignBar/SignBar';
import NavBar from './NavBar/NavBar';
//
import { pageAccessedByReload } from '../../../data/isPageReloaded';
//
import { useEffect, useState } from 'react';

const Header = () => {
    // const [isUp, setIsUp] = useState(false);

    // useEffect(() => {
    //     var lastScroll =
    //         window.pageYOffset || document.documentElement.scrollTop;

    //     function checkDown() {
    //         var currentScroll =
    //             window.pageYOffset || document.documentElement.scrollTop;
    //         if (currentScroll > lastScroll) {
    //             setIsUp(false);
    //             window.addEventListener('scroll', checkUp);
    //             window.removeEventListener('scroll', checkDown);
    //         }
    //         lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    //     }

    //     function checkUp() {
    //         var currentScroll =
    //             window.pageYOffset || document.documentElement.scrollTop;
    //         if (currentScroll < lastScroll && window.innerWidth > 1024) {
    //             setIsUp(true);
    //             window.addEventListener('scroll', checkDown);
    //             window.removeEventListener('scroll', checkUp);
    //         }
    //         lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    //     }

    //     window.addEventListener('scroll', checkDown);
    //     window.addEventListener('scroll', checkUp);
    // });

    const [isDown, setIsDown] = useState(false);

    //Nav SideEff khi scroll
    useEffect(() => {
        function checkNavDown() {
            if (window.pageYOffset > 50) {
                setIsDown(true);
                window.removeEventListener('scroll', checkNavDown);
            }
        }

        function checkNavUp() {
            if (window.pageYOffset === 0) {
                setIsDown(false);
                window.removeEventListener('scroll', checkNavUp);
            }
        }

        window.addEventListener('scroll', checkNavDown);
        window.addEventListener('scroll', checkNavUp);
    }, [isDown]);

    const mq = window.matchMedia('(min-width: 1025px)');

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
    }, []);

    return (
        <header
            style={{
                animation: pageAccessedByReload && 'none',
                top: isDown && isMobileView && '-55px',
            }}
        >
            <SignBar />
            <NavBar />
        </header>
    );
};

export default Header;
