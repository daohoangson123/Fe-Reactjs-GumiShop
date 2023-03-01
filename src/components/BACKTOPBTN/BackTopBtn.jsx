import { useState } from 'react';
import './BackTopBtn.css';

const BackTopBtn = () => {
    const [backtop, setBacktop] = useState("BackTopBtn");

    const scrollTop = () => {
        if(window.pageYOffset > 400) {
            setBacktop("BackTopBtn-actived");
        } else {
            setBacktop("BackTopBtn");
        }
    };

    window.addEventListener("scroll", scrollTop);

    const scrollToTop = () => {
        window.scrollTo({
        top: 0, 
        behavior: 'smooth'
        });
    };


    return (
        <div className={backtop}
        onClick={scrollToTop}>
            Up
        </div>
    )
}

export default BackTopBtn;