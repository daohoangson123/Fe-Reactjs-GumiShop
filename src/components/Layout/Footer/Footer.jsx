import './Footer.css';
//
import FooterTop from './FooterTop/FooterTop';
import FooterBot from './FooterBot/FooterBot';

const Footer = () => {
    return (
        <footer>
            <div className="Footer__Container">
                <FooterTop />
                <hr />
                <FooterBot />
            </div>
        </footer>
    );
};

export default Footer;
