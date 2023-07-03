import './AdBanner.css';
//
import { useEffect, useState } from 'react';
//
import { pageAccessedByReload } from '../../../../data/isPageReloaded';

const AdBanner = () => {
    const [layerClosed, setLayerClosed] = useState(() => {
        const saved = localStorage.getItem('layerClosed');
        const initialValue = JSON.parse(saved);
        return initialValue || false;
    });

    useEffect(() => {
        const htmlBody = document.querySelectorAll(['html', 'body']);
        const firstLoadLayer = document.getElementById('PageFisrtLoad');
        const closeLayerBtn = document.getElementById('AdBanner__Btn');

        function preventScroll() {
            if (firstLoadLayer && !layerClosed) {
                htmlBody.forEach((item) => item.classList.add('preventScroll'));
            }
        }
        preventScroll();

        function removePreventScroll() {
            htmlBody.forEach((item) => item.classList.remove('preventScroll'));
        }

        if (firstLoadLayer && !layerClosed && !pageAccessedByReload) {
            setTimeout(() => (firstLoadLayer.style.display = 'grid'), 500);
        }

        function removeFirstLoadLayer() {
            if (firstLoadLayer) {
                setLayerClosed(true);
                firstLoadLayer.remove();
                removePreventScroll();
            }
        }

        closeLayerBtn &&
            closeLayerBtn.addEventListener('click', removeFirstLoadLayer);

        localStorage.setItem('layerClosed', JSON.stringify(layerClosed));

        window.onunload = () => {
            localStorage.removeItem('layerClosed');
        };
    }, [layerClosed]);

    return (
        <div
            id='PageFisrtLoad'
            className='PageFisrtLoad'>
            <div className='AdBanner'>
                <button
                    type='button'
                    id='AdBanner__Btn'
                    className='AdBanner__Btn'>
                    <i className='fa-solid fa-xmark'></i>
                </button>
            </div>
        </div>
    );
};

export default AdBanner;
