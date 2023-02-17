import './App.css';
import { Routes, Route } from "react-router-dom";
import LandingPage from './components/MAIN/LandingPage';
import Header from './components/HEADER/Header';
import Footer from './components/FOOTER/Footer';
import BackTopBtn from './components/BACKTOPBTN/BackTopBtn';

function App() {
  return (
    <div className='App '>
        <Header />
      <main className=''>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
        </Routes>
      </main>
        <Footer />
        <BackTopBtn />
    </div>
  );
}

export default App;
