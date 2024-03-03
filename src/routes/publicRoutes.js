import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
//
import PrivateRoutes from './privateRoutes';
import PageLoading from '../components/Layout/UI/Loading/PageLoading';
//
const Shop = lazy(() => import('../components/HandleData/Shop/Shop'));
const Cart = lazy(() => import('../components/HandleData/Cart/Cart'));
const ProductDetail = lazy(
    () => import('../components/HandleData/ProductDetail/ProductDetail')
);
const WholesaleProductDetail = lazy(
    () =>
        import(
            '../components/HandleData/WholesaleProductDetail/WholesaleProductDetail'
        )
);
//
const SignIn = lazy(
    () => import('../components/HandleData/User/SignIn/SignIn')
);
const UserProfile = lazy(
    () => import('../components/HandleData/User/UserProfile/UserProfile')
);
const SignUp = lazy(
    () => import('../components/HandleData/User/SignUp/SignUp')
);
//
const LandingPage = lazy(
    () => import('../components/Layout/Pages/LandingPage/LandingPage')
);
const StockistPage = lazy(
    () => import('../components/Layout/Pages/Stockist/StockistPage')
);
const FaqPage = lazy(() => import('../components/Layout/Pages/FAQ/FaqPage'));
const Wholesale = lazy(
    () => import('../components/Layout/Pages/Wholesale/Wholesale')
);
const ContactPage = lazy(
    () => import('../components/Layout/Pages/ContactPage/ContactPage')
);
const NotFoundPage = lazy(
    () => import('../components/Layout/Pages/NotFoundPage/NotFoundPage')
);
const NewsDetail = lazy(
    () =>
        import(
            '../components/Layout/Pages/LandingPage/LatestNew/NewsDetail/NewsDetail'
        )
);

const PublicRoutes = () => {
    return (
        <Suspense fallback={<PageLoading />}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/stockist" element={<StockistPage />} />
                <Route path="/wholesale" element={<Wholesale />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/userSignIn" element={<SignIn />} />
                <Route
                    path="/userProfile"
                    element={
                        <PrivateRoutes>
                            <UserProfile />
                        </PrivateRoutes>
                    }
                />
                <Route path="/userSignUp" element={<SignUp />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shop/:id" element={<ProductDetail />} />
                <Route
                    path="/wholesale/:id"
                    element={<WholesaleProductDetail />}
                />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
};

export default PublicRoutes;
