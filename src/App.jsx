import './App.css';
//
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
//
import Loading from './components/Layout/UI/Loading/Loading';

//
import Header from './components/Layout/Header/Header';
// const Header = lazy(() => import('./components/Layout/Header/Header'));
const LandingPage = lazy(() =>
    import('./components/Layout/Pages/LandingPage/LandingPage'),
);
const Footer = lazy(() => import('./components/Layout/Footer/Footer'));
//
const ProductDetail = lazy(() =>
    import('./components/HandleData/ProductDetail/ProductDetail'),
);
const NewsDetail = lazy(() =>
    import(
        './components/Layout/Pages/LandingPage/LatestNew/NewsDetail/NewsDetail'
    ),
);
//
const StockistPage = lazy(() =>
    import('./components/Layout/Pages/Stockist/StockistPage'),
);
const ContactPage = lazy(() =>
    import('./components/Layout/Pages/ContactPage/ContactPage'),
);
const NotFoundPage = lazy(() =>
    import('./components/Layout/Pages/NotFoundPage/NotFoundPage'),
);
//
const Shop = lazy(() => import('./components/HandleData/Shop/Shop'));
const Cart = lazy(() => import('./components/HandleData/Cart/Cart'));
const User = lazy(() => import('./components/HandleData/User/User'));
//
const BackTopWrapper = lazy(() =>
    import('./components/Support/BackTopWrapper/BackTopWrapper'),
);
const BackTopBtn = lazy(() =>
    import('./components/Support/BackTopBtn/BackTopBtn'),
);
//

function App() {
    return (
        <div className='App'>
            <Header />
            <Suspense
                fallback={<Loading loadingContent='Page is Loading...' />}
            >
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
                    </BackTopWrapper>
                </main>
                <BackTopBtn />
                <Footer />
            </Suspense>
        </div>
    );
}

export default App;
