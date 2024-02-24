import './NavBar.css';
//
import { nav_Items } from '../../../../data/nav_Items';
//
import Logo from './Logo/Logo';
import NavRouting from './NavRouting/NavRouting';
import { Suspense, lazy } from 'react';
const MobileMenuToggle = lazy(() => import('./MobileMenu/MobileMenuToggle'));
const SearchCart = lazy(() => import('./SearchCart/SearchCart'));

const NavBar = ({ isMobileView }) => {
    return (
        <>
            <nav className='NavBar'>
                <Suspense fallback={'loading...'}>
                    <MobileMenuToggle
                        isMobileView={isMobileView}
                        navlinkData={nav_Items}
                    />
                    <Logo />
                    <NavRouting navlinkData={nav_Items} />
                    <SearchCart />
                </Suspense>
            </nav>
        </>
    );
};

export default NavBar;
