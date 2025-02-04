import './Control.css';
//
import control1 from '../../../../../assets/img/control1.jpg';
import control2 from '../../../../../assets/img/control2.jpg';
import control3 from '../../../../../assets/img/control3.jpg';
//

const Control = ({ title, content, btn }) => {
    return (
        <section className="Container Control">
            <div className="Control__Content">
                <div className="Cotrol__Content-Title">{title}</div>
                <p className="Cotrol__Content-Text">{content}</p>
                <button className="Cotrol__Content-Btn">{btn}</button>
            </div>
            <div className="Control__Img-Container">
                <img
                    className="Control__Img-1 Control__Img-Item"
                    src={control1}
                    alt="controlImg1"
                    loading="lazy"
                />
                <img
                    className="Control__Img-2 Control__Img-Item"
                    src={control2}
                    alt="controlImg2"
                    loading="lazy"
                />
                <img
                    className="Control__Img-3 Control__Img-Item"
                    src={control3}
                    alt="controlImg3"
                    loading="lazy"
                />
            </div>
        </section>
    );
};

export default Control;
