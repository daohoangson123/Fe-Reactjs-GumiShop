import './Header.css';
//
import SignBar from './SignBar/SignBar';
import NavBar from './NavBar/NavBar';
//
import { pageAccessedByReload } from '../../../data/isPageReloaded';
//

const Header = ({ isSignIn }) => {
    return (
        <header
            style={{
                animation: pageAccessedByReload && 'none',
            }}>
            <SignBar isSignIn={isSignIn} />
            <NavBar />
        </header>
    );
};

export default Header;
