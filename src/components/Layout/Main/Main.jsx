import { Routes, Route } from 'react-router-dom';
//
import LandingPage from '../Pages/LandingPage/LandingPage';
//
import ProductDetail from '../../HandleData/ProductDetail/ProductDetail';
import NewsDetail from '../Pages/LandingPage/LatestNew/NewsDetail/NewsDetail';
//
import StockistPage from '../Pages/Stockist/StockistPage';
import ContactPage from '../Pages/ContactPage/ContactPage';
import NotFoundPage from '../Pages/NotFoundPage/NotFoundPage';
//
import Shop from '../../HandleData/Shop/Shop';
import Cart from '../../HandleData/Cart/Cart';
import User from '../../HandleData/User/User';
//
import BackTopWrapper from '../../Support/BackTopWrapper/BackTopWrapper';
import BackTopBtn from '../../Support/BackTopBtn/BackTopBtn';
//

function Main() {
    return (
        <main>
            <BackTopWrapper>
                <Routes>
                    <Route
                        path='/'
                        element={<LandingPage />}
                    />
                    <Route
                        path='/shop'
                        element={<Shop />}
                    />
                    <Route
                        path='/faq'
                        element={null}
                    />
                    <Route
                        path='/stockist'
                        element={<StockistPage />}
                    />
                    <Route
                        path='/wholesale'
                        element={null}
                    />
                    <Route
                        path='/contact'
                        element={<ContactPage />}
                    />
                    <Route
                        path='/user'
                        element={<User />}
                    />
                    <Route
                        path='/cart'
                        element={<Cart />}
                    />
                    <Route
                        path='/shop/:id'
                        element={<ProductDetail />}
                    />
                    <Route
                        path='/news/:id'
                        element={<NewsDetail />}
                    />
                    <Route
                        path='*'
                        element={<NotFoundPage />}
                    />
                </Routes>
                <BackTopBtn />
            </BackTopWrapper>
        </main>
    );
}

export default Main;
