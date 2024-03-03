import './NavBar.css';
//
import { nav_Items } from '../../../../data/nav_Items';
//
import Logo from './Logo/Logo';
import NavRouting from './NavRouting/NavRouting';
import MobileMenu from './MobileMenu/MobileMenu';
import SearchCart from './SearchCart/SearchCart';

const NavBar = () => {
    return (
        <nav className="NavBar">
            <MobileMenu navlinkData={nav_Items} />
            <Logo />
            <NavRouting navlinkData={nav_Items} />
            <SearchCart />
        </nav>
    );
};

export default NavBar;
