import './App.css';
//
import { Suspense, lazy } from 'react';
//
import Loading from './components/Layout/UI/Loading/Loading';

//
import Header from './components/Layout/Header/Header';

const Main = lazy(() => import('./components/Layout/Main/Main'));

const Footer = lazy(() => import('./components/Layout/Footer/Footer'));
//

function App() {
    return (
        <div className='App'>
            <Header />
            <Suspense
                fallback={
                    <Loading loadingContent='Gumi is loading data, please wait a sec...' />
                }
            >
                <Main />
                <Footer />
            </Suspense>
        </div>
    );
}

export default App;
