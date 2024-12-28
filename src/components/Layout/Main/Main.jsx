import './Main.css';
//
import BackTopWrapper from '../../Support/BackTopWrapper/BackTopWrapper';
import BackTopBtn from '../../Support/BackTopBtn/BackTopBtn';
//
import PublicRoutes from '../../../routes/publicRoutes';
import ErrorBoundary from '../../Support/Error/ErrorBoundary';

function Main() {
    return (
        <main>
            <ErrorBoundary>
                <BackTopWrapper>
                    <PublicRoutes />
                    <BackTopBtn />
                </BackTopWrapper>
            </ErrorBoundary>
        </main>
    );
}

export default Main;
