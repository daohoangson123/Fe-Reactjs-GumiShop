import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
//

const LandingPage = lazy(() => import('../Pages/LandingPage/LandingPage'));
//
const ProductDetail = lazy(() =>
    import('../../HandleData/ProductDetail/ProductDetail'),
);
const NewsDetail = lazy(() =>
    import('../Pages/LandingPage/LatestNew/NewsDetail/NewsDetail'),
);
//
const StockistPage = lazy(() => import('../Pages/Stockist/StockistPage'));
const ContactPage = lazy(() => import('../Pages/ContactPage/ContactPage'));
const NotFoundPage = lazy(() => import('../Pages/NotFoundPage/NotFoundPage'));
//
const Shop = lazy(() => import('../../HandleData/Shop/Shop'));
const Cart = lazy(() => import('../../HandleData/Cart/Cart'));
const User = lazy(() => import('../../HandleData/User/User'));
//
const BackTopWrapper = lazy(() =>
    import('../../Support/BackTopWrapper/BackTopWrapper'),
);
const BackTopBtn = lazy(() => import('../../Support/BackTopBtn/BackTopBtn'));
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
