import { Routes, Route } from "react-router-dom";
import Header from './components/HEADER/Header';
import LandingPage from './components/MAIN/LandingPage';
import Footer from './components/FOOTER/Footer';
import BackTopBtn from './components/BACKTOPBTN/BackTopBtn';
import Shop from './components/FUNCTIONPAGES/Shop';
import BackTopWrapper from './components/BACKTOPWRAPPER/BackTopWrapper';
import './App.css';

function App() {
  return (
    <div className='App '>
        <Header />
      <main className=''>
      <BackTopWrapper>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/shop' element={<Shop/>} />
        </Routes>
      </BackTopWrapper>
      </main>
        <Footer />
        <BackTopBtn />
    </div>
  );
}

export default App;
