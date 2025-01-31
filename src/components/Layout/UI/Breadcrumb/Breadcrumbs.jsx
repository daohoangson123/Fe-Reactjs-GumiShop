import './Breadcrumbs.css';
//
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ArrowRight from '../SVG/Shapes/ArrowRight';

export default function Breadcrumbs() {
    const location = useLocation();
    let currentLink = '';
    const crumbs = location.pathname
        .split('/')
        .filter((crumb) => crumb !== '')
        .map((crumb) => {
            currentLink = currentLink + `/${crumb}`;
            return (
                <li key={crumb} className="CrumbItem">
                    <Link to={currentLink}>
                        {crumb.replace(/-/g, ' ')}
                        <ArrowRight />
                    </Link>
                </li>
            );
        });
    return (
        <ol className="Breadcrumbs">
            {location.pathname !== '/' && (
                <li className="CrumbItem">
                    <Link to="/">
                        Home
                        <ArrowRight />
                    </Link>
                </li>
            )}
            {crumbs}
        </ol>
    );
}
