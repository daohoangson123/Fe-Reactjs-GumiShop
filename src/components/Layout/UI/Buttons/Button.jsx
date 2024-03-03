import './Button.css';
//
import { Link } from 'react-router-dom';

const Button = ({ content, linkTo, type, hoverShape }) => {
    return (
        <button
            className={`Global__Btn Global__Btn--${type}
            Global__Btn--${hoverShape}`}
        >
            {linkTo ? <Link to={linkTo}>{content}</Link> : content}
        </button>
    );
};

export default Button;
