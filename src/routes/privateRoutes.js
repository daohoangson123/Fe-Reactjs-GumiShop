import { useSelector } from 'react-redux';
import { signinSelector } from '../redux/Selectors/Selector';
import { Suspense, lazy } from 'react';
import PageLoading from '../components/Layout/UI/Loading/PageLoading';
const NotFoundPage = lazy(
    () => import('../components/Layout/Pages/NotFoundPage/NotFoundPage')
);

const PrivateRoutes = (props) => {
    const isSignIn = useSelector(signinSelector);

    if (!isSignIn) {
        return (
            <div style={{ textAlign: 'center', fontSize: '30px' }}>
                <Suspense fallback={<PageLoading />}>
                    Sorry you don't have access to this page, please Sign In!
                    <NotFoundPage />
                </Suspense>
            </div>
        );
    }
    return <>{props.children}</>;
};

export default PrivateRoutes;
