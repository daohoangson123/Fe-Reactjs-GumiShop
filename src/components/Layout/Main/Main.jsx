import './Main.css';
//
import BackTopWrapper from '../../Support/BackTopWrapper/BackTopWrapper';
import BackTopBtn from '../../Support/BackTopBtn/BackTopBtn';
//
import PublicRoutes from '../../../routes/publicRoutes';

function Main() {
    return (
        <main>
            <BackTopWrapper>
                <PublicRoutes />
                <BackTopBtn />
            </BackTopWrapper>
        </main>
    );
}

export default Main;
