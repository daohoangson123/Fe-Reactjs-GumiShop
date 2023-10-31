import './AdBanner.css';
//
import { useEffect, useState } from 'react';
//

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

        if (firstLoadLayer && !layerClosed) {
            setTimeout(() => (firstLoadLayer.style.display = 'grid'), 200);
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
    }, [layerClosed]);

    return (
        <div
            id='PageFisrtLoad'
            className='PageFisrtLoad'
        >
            <button
                type='button'
                id='AdBanner__Btn'
                className='AdBanner__Btn'
            >
                <i className='fa-solid fa-xmark'></i>
            </button>
            <div className='AdBanner'></div>
        </div>
    );
};

export default AdBanner;
