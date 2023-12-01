import './AdBanner.css';
//
import ad from '../../../../assets/img/product3.webp';
//
import { useEffect, useState } from 'react';
//

const AdBanner = () => {
    const [layerClosed, setLayerClosed] = useState(() => {
        const saved = localStorage.getItem('layerClosed');
        const initialValue = JSON.parse(saved);
        return initialValue || false;
    });
    const [isLoaded, setIsLoaded] = useState(false);

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
    }, [layerClosed, isLoaded]);

    return (
        <div
            id='PageFisrtLoad'
            className='PageFisrtLoad'>
            <div className='AdBanner-Container'>
                {isLoaded && (
                    <button
                        type='button'
                        id='AdBanner__Btn'
                        className='AdBanner__Btn'>
                        <i className='fa-solid fa-xmark'></i>
                    </button>
                )}
                <img
                    src={ad}
                    alt='AD Banner Img'
                    className='AdBanner_Img'
                    onLoad={() => setIsLoaded(true)}
                />
            </div>
        </div>
    );
};

export default AdBanner;
