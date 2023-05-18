import './Control.css';
import control1 from '../../../../Assets/img/control1.webp';
import control2 from '../../../../Assets/img/control2.webp';
import control3 from '../../../../Assets/img/control3.webp';

const Control = () => {
    return (
        <section className='Control container'>
            <div className='Control__Content'>
                <div className='Cotrol__Content-Title'>
                    TAKE CONTROL OF YOUR HEALTH
                </div>
                <p className='Cotrol__Content-Text'>
                    The Good4Me range has been formulated based on scientific &
                    traditional evidence.
                    <br />
                    Our vitamins are here and ready to boost your mood, immunity
                    and overall well-being!
                    <br />
                    Made in New Zealand from local and imported ingredients.
                </p>
                <button className='Cotrol__Content-Btn'>
                    BROWSE OUR RANGE
                </button>
            </div>
            <div className='Control__Img'>
                <img
                    className='Control__Img-1'
                    src={control1}
                    alt='control-img'
                />
                <img
                    className='Control__Img-2'
                    src={control2}
                    alt='control-img'
                />
                <img
                    className='Control__Img-3'
                    src={control3}
                    alt='control-img'
                />
            </div>
        </section>
    );
};

export default Control;
