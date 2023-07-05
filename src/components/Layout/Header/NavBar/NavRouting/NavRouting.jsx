import './NavRouting.css';
//
import { NavLink } from 'react-router-dom';

const NavRouting = ({ navlinkData }) => {
    return (
        <div className='NavBar__List'>
            {navlinkData.map((item) => (
                <abbr
                    title={item.name}
                    key={item.name}>
                    <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                            isActive ? 'active' : 'inactive'
                        }>
                        {item.name}
                    </NavLink>
                </abbr>
            ))}
        </div>
    );
};

export default NavRouting;
