import './App.css';
//
import { useEffect } from 'react';
//
import Header from './components/Layout/Header/Header';
import Main from './components/Layout/Main/Main';
import Footer from './components/Layout/Footer/Footer';
import Loading from './components/Layout/UI/Loading/Loading';
//
import { pageAccessedByReload } from './data/isPageReloaded';
//

function App() {
    useEffect(() => {
        const firstLoadLayer = document.getElementById('PageFisrtLoad');

        function removeFirstLoadLayer() {
            if (firstLoadLayer) {
                setTimeout(() => firstLoadLayer.remove(), 2000);
            }
        }

        removeFirstLoadLayer();
    }, []);
    return (
        <div className='App'>
            {!pageAccessedByReload && (
                <div
                    id='PageFisrtLoad'
                    className='PageFisrtLoad'
                >
                    <Loading />
                </div>
            )}
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
