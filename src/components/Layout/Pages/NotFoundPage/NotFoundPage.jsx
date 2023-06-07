import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
    return (
        <section className='NotFoundPage'>
            <div className='NotFoundPage__Content'># 404 Page Not Found</div>
            <button
                type='button'
                className='NotFoundPage__Btn'
            >
                <Link to='/'>Go Home</Link>
            </button>
        </section>
    );
}

export default NotFoundPage;
