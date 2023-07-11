import BackTopWrapper from '../../Support/BackTopWrapper/BackTopWrapper';
import BackTopBtn from '../../Support/BackTopBtn/BackTopBtn';
//
import { useEffect } from 'react';
//
import { pageAccessedByReload } from '../../../data/isPageReloaded';
import PublicRoutes from '../../../routes/publicRoutes';

function Main() {
    useEffect(() => {
        function show(sect) {
            sect.classList.add('sectshow');
            sect.classList.remove('secthide');
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
                sect.classList.add('secthide');
            }
        });

        return () => observer.disconnect();
    }, []);
    return (
        <main>
            <BackTopWrapper>
                <PublicRoutes />
                <BackTopBtn />
            </BackTopWrapper>
        </main>
    );
}

export default Main;
