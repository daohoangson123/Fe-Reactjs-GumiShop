import { useSelector } from 'react-redux';
import { signinSelector } from '../redux/Selectors/Selector';
import NotFoundPage from '../components/Layout/Pages/NotFoundPage/NotFoundPage';

const PrivateRoutes = (props) => {
    const isSignIn = useSelector(signinSelector);

    if (!isSignIn) {
        return (
            <div style={{ textAlign: 'center', fontSize: '30px' }}>
                Sorry you don't have access to this page, please Sign In!
                <NotFoundPage />
            </div>
        );
    }
    return <>{props.children}</>;
};

export default PrivateRoutes;
