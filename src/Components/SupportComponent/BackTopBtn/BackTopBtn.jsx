import './BackTopBtn.css';
//
import { useState } from 'react';

const BackTopBtn = () => {
    const [showBacktop, setShowBacktop] = useState(false);

    const scrollTop = () => {
        if (window.pageYOffset > 400) {
            setShowBacktop(true);
            // hạn chế gọi hàm
            window.removeEventListener('scroll', scrollTop);
        }
    };

    window.addEventListener('scroll', scrollTop);

    const scrollAlt = () => {
        if (window.pageYOffset < 400) {
            setShowBacktop(false);
            window.addEventListener('scroll', scrollTop);
            // hạn chế gọi hàm
            window.removeEventListener('scroll', scrollAlt);
        }
    };

    window.addEventListener('scroll', scrollAlt);

    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div
            className={showBacktop ? 'BackTopBtn-actived' : 'BackTopBtn'}
            onClick={scrollToTop}
        >
            <i className='fa-sharp fa-regular fa-circle-up'></i>
        </div>
    );
};

export default BackTopBtn;
