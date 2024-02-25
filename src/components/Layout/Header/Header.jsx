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

    useEffect(() => {
        let lastScroll = window.screenY;

        function checkDown() {
            let currentScroll = window.screenY;
            if (currentScroll > lastScroll) {
                setIsUp(false);
                setIsDown(true);
                window.addEventListener('scroll', checkUp);
                window.removeEventListener('scroll', checkDown);
            }
            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        }

        function checkUp() {
            let currentScroll = window.scrollY;
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

        console.log('run');
    }, [isUp]);

    return (
        <header
            style={{
                animation: pageAccessedByReload && 'none',
                top: isDown ? '-60px' : 0,
            }}>
            <SignBar isSignIn={isSignIn} />
            <NavBar />
        </header>
    );
};

export default Header;
