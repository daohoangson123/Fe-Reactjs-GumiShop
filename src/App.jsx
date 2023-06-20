import './App.css';
//
import Header from './components/Layout/Header/Header';
import Main from './components/Layout/Main/Main';
import Footer from './components/Layout/Footer/Footer';
import ErrorBoundary from './components/Support/Error/ErrorBoundary';
//

function App() {
    //
    return (
        <div className='App'>
            <Header />
            <ErrorBoundary>
                <Main />
            </ErrorBoundary>
            <Footer />
        </div>
    );
}

export default App;
