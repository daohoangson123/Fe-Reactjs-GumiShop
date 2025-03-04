import ArrowUp from '../../Layout/UI/SVG/Icons/ArrowUp';
import './BackTopBtn.css';
//
import { useEffect, useState } from 'react';

const BackTopBtn = () => {
    const [showBacktop, setShowBacktop] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const scrollTop = () => {
            if (window.scrollY > 400) {
                setShowBacktop(true);
                window.removeEventListener('scroll', scrollTop);
            }
            return;
        };
        window.addEventListener('scroll', scrollTop);

        const scrollAlt = () => {
            if (window.scrollY < 400) {
                setShowBacktop(false);
                window.removeEventListener('scroll', scrollAlt);
            }
            return;
        };

        if (showBacktop) {
            window.addEventListener('scroll', scrollAlt);
        }

        return () => {
            window.removeEventListener('scroll', scrollTop);
            window.removeEventListener('scroll', scrollAlt);
        };
    }, [showBacktop]);

    return (
        <div
            className={showBacktop ? 'BackTopBtn-actived' : 'BackTopBtn'}
            onClick={scrollToTop}
        >
            <ArrowUp />
        </div>
    );
};

export default BackTopBtn;
