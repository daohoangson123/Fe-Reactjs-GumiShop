import './Logo.css';
//
import { NavLink } from 'react-router-dom';

const Logo = () => {
    return (
        <NavLink to='/'>
            <h1 className='NavBar__Logo'>
                GOOD<span>4</span>ME.
            </h1>
        </NavLink>
    );
};

export default Logo;
