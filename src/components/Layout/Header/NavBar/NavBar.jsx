import './NavBar.css';
//
import { nav_Items } from '../../../../data/nav_Items';
//
import MobileMenuToggle from './MobileMenu/MobileMenuToggle';
import Logo from './Logo/Logo';
import NavRouting from './NavRouting/NavRouting';
import SearchCart from './SearchCart/SearchCart';

const NavBar = () => {
    return (
        <>
            <nav className='NavBar'>
                <MobileMenuToggle navlinkData={nav_Items} />
                <Logo />
                <NavRouting navlinkData={nav_Items} />
                <SearchCart />
            </nav>
        </>
    );
};

export default NavBar;
