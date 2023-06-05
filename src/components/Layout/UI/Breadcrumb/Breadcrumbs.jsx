import './Breadcrumbs.css';
//
import foward_arrow from '../../../../assets/icon/foward-arrow.png';
//
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Breadcrumbs() {
    const location = useLocation();
    let currentLink = '';
    const crumbs = location.pathname
        .split('/')
        .filter((crumb) => crumb !== '')
        .map((crumb) => {
            currentLink = currentLink + `/${crumb}`;
            return (
                <li
                    key={crumb}
                    className='CrumbItem'
                >
                    <Link to={currentLink}>
                        {crumb.replace(/-/g, ' ')}
                        <img
                            src={foward_arrow}
                            alt='>'
                        />
                    </Link>
                </li>
            );
        });
    return (
        <ol className='Breadcrumbs'>
            {location.pathname !== '/' && (
                <li className='CrumbItem'>
                    <Link to='/'>
                        Home
                        <img
                            src={foward_arrow}
                            alt='>'
                        />
                    </Link>
                </li>
            )}
            {crumbs}
        </ol>
    );
}
