import './AdBanner.css';
//
import ad from '../../../../assets/img/product3.webp';
//
import { useEffect, useState } from 'react';
//
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const AdBanner = () => {
    const [layerClosed, setLayerClosed] = useState(() => {
        const saved = localStorage.getItem('layerClosed');
        const initialValue = JSON.parse(saved);
        return initialValue || false;
    });

    const [pageLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        setPageLoaded(true);
        const firstLoadLayer = document.getElementById('PageFisrtLoad');
        const closeLayerBtn = document.getElementById('AdBanner__Btn');

        function preventScroll() {
            if (!layerClosed) {
                disableBodyScroll(firstLoadLayer);
            }
        }

        preventScroll();

        function removePreventScroll() {
            clearAllBodyScrollLocks();
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
    }, [layerClosed, pageLoaded]);

    return (
        <div
            id='PageFisrtLoad'
            className='PageFisrtLoad'>
            <div className='AdBanner-Container'>
                <button
                    type='button'
                    id='AdBanner__Btn'
                    className='AdBanner__Btn'>
                    <i className='fa-solid fa-xmark'></i>
                </button>
                <img
                    src={ad}
                    alt='AD Banner Img'
                    className='AdBanner_Img'
                />
            </div>
        </div>
    );
};

export default AdBanner;
