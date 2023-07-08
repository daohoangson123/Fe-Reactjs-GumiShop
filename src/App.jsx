import './App.css';
//
import Header from './components/Layout/Header/Header';
import Main from './components/Layout/Main/Main';
import Footer from './components/Layout/Footer/Footer';
//
import AdBanner from './components/Layout/UI/AdBanner/AdBanner';
//

function App() {
    const saved = localStorage.getItem('layerClosed');
    const initialValue = JSON.parse(saved);

    return (
        <div className='App'>
            {!initialValue && <AdBanner />}
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
