import './Logo.css';
//
import { NavLink } from 'react-router-dom';

const Logo = () => {
    return (
        <h1 className='NavBar__Logo'>
            <NavLink to='/'>
                GOOD<span>4</span>ME.
            </NavLink>
        </h1>
    );
};

export default Logo;
