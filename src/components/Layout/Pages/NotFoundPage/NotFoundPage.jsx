import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
    return (
        <div className='NotFoundPage'>
            <div className='NotFoundPage__Content'># 404 Page Not Found</div>

            <Link
                to='/'
                className='NotFoundPage__BackHome'
            >
                Go Home
            </Link>
        </div>
    );
}

export default NotFoundPage;
