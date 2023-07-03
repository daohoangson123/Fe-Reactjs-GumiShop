import './App.css';
//
import Header from './components/Layout/Header/Header';
import Main from './components/Layout/Main/Main';
import Footer from './components/Layout/Footer/Footer';
//
import AdBanner from './components/Layout/UI/AdBanner/AdBanner';
//
import { useEffect } from 'react';
//
import { pageAccessedByReload } from './data/isPageReloaded';

function App() {
    useEffect(() => {
        function show(sect) {
            sect.classList.add('show');
            sect.classList.remove('hide');
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (!pageAccessedByReload) {
                        show(entry.target);
                    }
                }
            });
        });

        const sectList = document.querySelectorAll('section');

        sectList.forEach((sect) => {
            observer.observe(sect);
            if (!pageAccessedByReload) {
                sect.classList.add('hide');
            }
        });

        return () => observer.disconnect();
    }, []);
    return (
        <div className='App'>
            <AdBanner />
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
