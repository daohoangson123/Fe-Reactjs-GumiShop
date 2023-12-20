import './Logo.css';
//
import { NavLink } from 'react-router-dom';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';

const Logo = () => {
    return (
        <h1 className='NavBar__Logo'>
            <NavLink
                to='/'
                title='Gumi HomePage'
                onClick={() => {
                    clearAllBodyScrollLocks();
                }}
            >
                GOOD<span>4</span>ME.
            </NavLink>
        </h1>
    );
};

export default Logo;
