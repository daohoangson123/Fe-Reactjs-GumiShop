import './App.css';
// import { Routes, Route } from "react-router-dom";
// import LandingPage from './components/MAIN/LandingPage';
import Header from './components/HEADER/Header';
// import Footer from './components/FOOTER/Footer';

function App() {
  return (
    <div className='App '>
      <header>
        <Header />
      </header>
      {/* <main className=' text-center'>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='about' />
        </Routes>
      </main>
      <footer className=' text-center'>
        <Footer />
      </footer> */}
    </div>
  );
}

export default App;
