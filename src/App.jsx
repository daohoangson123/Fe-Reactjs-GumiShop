import { Routes, Route } from 'react-router-dom';
import Header from './Components/LayoutComponent/Header/Header/Header';
import LandingPage from './Components/LayoutComponent/Main/Main/LandingPage';
import Footer from './Components/LayoutComponent/Footer/Footer/Footer';
import Contact from './Components/LayoutComponent/Main/Contact/Contact';
import Shop from './Components/FunctionComponent/Shop/Shop';
import Cart from './Components/FunctionComponent/Cart/Cart';
import User from './Components/FunctionComponent/User/User';
import BackTopBtn from './Components/SupportComponent/BackTopBtn/BackTopBtn';
import BackTopWrapper from './Components/SupportComponent/BackTopWrapper/BackTopWrapper';
import NewsDetail from './Components/LayoutComponent/Main/LatestNew/NewsDetail/NewDetail';
import './App.css';

function App() {
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
                            element={null}
                        />
                        <Route
                            path='/wholesale'
                            element={null}
                        />
                        <Route
                            path='/contact'
                            element={<Contact />}
                        />
                        <Route
                            path='/userLogin'
                            element={<User user={true} />}
                        />
                        <Route
                            path='/userRegister'
                            element={<User user={false} />}
                        />
                        <Route
                            path='/cart'
                            element={<Cart />}
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
