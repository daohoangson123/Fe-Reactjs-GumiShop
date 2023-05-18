import { useEffect } from 'react';
import './Preloader.css';
//

export default function Preloader() {
    useEffect(() => {
        const pre = document.getElementById('preloader');

        setTimeout(() => {
            pre.remove();
        }, 3000);
    });

    return (
        <div
            id='preloader'
            className='preloader'
        >
            <div className='preloader__content'>WELCOME to GUMISHOP</div>
        </div>
    );
}
