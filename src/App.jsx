import { Routes, Route } from "react-router-dom";
import Header from './components/HEADER/Header';
import LandingPage from './components/MAIN/LandingPage';
import Footer from './components/FOOTER/Footer';
import BackTopBtn from './components/BACKTOPBTN/BackTopBtn';
import Shop from './components/FUNCTIONPAGES/Shop';
import BackTopWrapper from './components/BACKTOPWRAPPER/BackTopWrapper';
import './App.css';
import Cart from "./components/FUNCTIONPAGES/Cart";
import User from "./components/FUNCTIONPAGES/User";
import Contact from "./components/MAIN/Contact/Contact";

function App() {
  return (
    <div className='App'>
        <Header />
      <main>
      <BackTopWrapper>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/shop' element={<Shop/>} />
          <Route path='/faq' element={null} />
          <Route path='/stockist' element={null} />
          <Route path='/wholesale' element={null} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/userLogin' element={<User user={true} />} />
          <Route path='/userRegister' element={<User user={false} />} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      </BackTopWrapper>
      </main>
        <Footer />
        <BackTopBtn />
    </div>
  );
}

export default App;
