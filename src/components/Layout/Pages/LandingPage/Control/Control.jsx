import './Control.css';
//
import control1 from '../../../../../assets/img/control1.webp';
import control2 from '../../../../../assets/img/control2.webp';
import control3 from '../../../../../assets/img/control3.webp';
//

const Control = ({ title, content, btn }) => {
    return (
        <section className='Control Container'>
            <div className='Control__Content'>
                <div className='Cotrol__Content-Title'>{title}</div>
                <p className='Cotrol__Content-Text'>{content}</p>
                <button className='Cotrol__Content-Btn'>{btn}</button>
            </div>
            <div className='Control__Img'>
                <img
                    className='Control__Img-1'
                    src={null}
                    alt='control-img'
                    lazysrc={control1}
                />
                <img
                    className='Control__Img-2'
                    src={null}
                    alt='control-img2'
                    lazysrc={control2}
                />
                <img
                    className='Control__Img-3'
                    src={null}
                    alt='control-img3'
                    lazysrc={control3}
                />
            </div>
        </section>
    );
};

export default Control;
