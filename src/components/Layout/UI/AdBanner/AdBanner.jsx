import './AdBanner.css';
//
import { useEffect } from 'react';
//

const AdBanner = () => {
    useEffect(() => {
        const firstLoadLayer = document.getElementById('PageFisrtLoad');
        const closeLayerBtn = document.getElementById('AdBanner__Btn');

        if (firstLoadLayer) {
            setTimeout(() => (firstLoadLayer.style.display = 'grid'), 2000);
        }

        function removeFirstLoadLayer() {
            if (firstLoadLayer) {
                firstLoadLayer.remove();
            }
        }

        closeLayerBtn.addEventListener('click', removeFirstLoadLayer);
    }, []);

    return (
        <div
            id='PageFisrtLoad'
            className='PageFisrtLoad'
        >
            <div className='AdBanner'>
                <button
                    type='button'
                    id='AdBanner__Btn'
                    className='AdBanner__Btn'
                >
                    <i className='fa-solid fa-xmark'></i>
                </button>
            </div>
        </div>
    );
};

export default AdBanner;
