import './NavRouting.css';
//
import { NavLink } from 'react-router-dom';

const NavRouting = ({ navlinkData }) => {
    return (
        <div className="NavBar__List">
            {navlinkData.map((item) => (
                <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                        isActive ? 'active' : 'inactive'
                    }
                    title={item.name}
                    key={item.name}
                >
                    {item.name}
                </NavLink>
            ))}
        </div>
    );
};

export default NavRouting;
