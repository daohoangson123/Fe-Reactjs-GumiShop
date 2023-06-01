import './App.css';
//
import Header from './Components/LayoutComponent/Header/Header/Header';
import LandingPage from './Components/LayoutComponent/Main/Main/LandingPage';
import Footer from './Components/LayoutComponent/Footer/Footer/Footer';
//
import ProductDetail from './Components/FunctionComponent/ProductDetail/ProductDetail';
import NewsDetail from './Components/LayoutComponent/Main/LatestNew/NewsDetail/NewsDetail';
//
import ContactPage from './Components/LayoutComponent/Main/Pages/ContactPage/ContactPage';
import StockistPage from './Components/LayoutComponent/Main/Pages/Stockist/StockistPage';
//
import Shop from './Components/FunctionComponent/Shop/Shop';
import Cart from './Components/FunctionComponent/Cart/Cart';
import User from './Components/FunctionComponent/User/User';
//
import BackTopWrapper from './Components/SupportComponent/BackTopWrapper/BackTopWrapper';
import BackTopBtn from './Components/SupportComponent/BackTopBtn/BackTopBtn';
//
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        const sect = document.querySelectorAll('section');

        sect.forEach((item) => item.classList.add('hide'));

        const hiddenSect = document.querySelectorAll('.hide');

        function show() {
            const windowHeight = window.innerHeight;
            const elementVisible = 10;
            hiddenSect.forEach((item) => {
                const elementTop = item.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    item.classList.add('show');
                    item.classList.remove('hide');
                }
            });
        }

        window.addEventListener('scroll', show);

        document.title = 'Gumi Shopify';
    }, []);
    return (
        <div className='App'>
            <Header />
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
                    </Routes>
                </BackTopWrapper>
            </main>
            <Footer />
            <BackTopBtn />
        </div>
    );
}

export default App;
