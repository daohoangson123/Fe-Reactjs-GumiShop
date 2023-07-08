import { Routes, Route } from 'react-router-dom';
//
import LandingPage from '../components/Layout/Pages/LandingPage/LandingPage';
import StockistPage from '../components/Layout/Pages/Stockist/StockistPage';
import Wholesale from '../components/Layout/Pages/Wholesale/Wholesale';
import ContactPage from '../components/Layout/Pages/ContactPage/ContactPage';
import NotFoundPage from '../components/Layout/Pages/NotFoundPage/NotFoundPage';
import NewsDetail from '../components/Layout/Pages/LandingPage/LatestNew/NewsDetail/NewsDetail';
//
import Shop from '../components/HandleData/Shop/Shop';
import Cart from '../components/HandleData/Cart/Cart';
import ProductDetail from '../components/HandleData/ProductDetail/ProductDetail';
import WholesaleProductDetail from '../components/HandleData/WholesaleProductDetail/WholesaleProductDetail';
//
import SignIn from '../components/HandleData/User/SignIn/SignIn';
import UserProfile from '../components/HandleData/User/UserProfile/UserProfile';
import SignUp from '../components/HandleData/User/SignUp/SignUp';
//
import PrivateRoutes from './privateRoutes';

const PublicRoutes = () => {
    return (
        <>
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
                    element={<Wholesale />}
                />
                <Route
                    path='/contact'
                    element={<ContactPage />}
                />
                <Route
                    path='/userSignIn'
                    element={<SignIn />}
                />
                <Route
                    path='/userProfile'
                    element={
                        <PrivateRoutes>
                            <UserProfile />
                        </PrivateRoutes>
                    }
                />
                <Route
                    path='/userSignUp'
                    element={<SignUp />}
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
                    path='/wholesale/:id'
                    element={<WholesaleProductDetail />}
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
        </>
    );
};

export default PublicRoutes;
