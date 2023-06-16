import './NavRouting.css';
//
import { NavLink } from 'react-router-dom';

const NavRouting = ({ navlinkData }) => {
    return (
        <div className='NavBar__List'>
            {navlinkData.map((item) => (
                <NavLink
                    to={item.path}
                    key={item.name}
                    className={({ isActive }) =>
                        isActive ? 'active' : 'inactive'
                    }
                >
                    {item.name}
                </NavLink>
            ))}
        </div>
    );
};

export default NavRouting;
