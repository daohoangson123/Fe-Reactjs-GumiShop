import './App.css';
//
import { useEffect } from 'react';
//
import Header from './components/Layout/Header/Header';
import Main from './components/Layout/Main/Main';
import Footer from './components/Layout/Footer/Footer';
//

function App() {
    useEffect(() => {
        document.title = 'Gumi Shopify';
        function load(img) {
            const url = img.getAttribute('lazysrc');
            img.setAttribute('src', url);
        }

        var lazyImgs = document.querySelectorAll('[lazysrc]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    load(entry.target);
                }
            });
        });

        lazyImgs.forEach((img) => {
            observer.observe(img);
        });

        return () => observer.disconnect();
    }, []);
    return (
        <div className='App'>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
