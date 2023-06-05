import './Footer.css';
//
import bgTop from '../../../assets/img/FooterTop.webp';
//
import FooterTop from './FooterTop/FooterTop';
import FooterBot from './FooterBot/FooterBot';

const Footer = () => {
    return (
        <footer>
            <img
                className='FooterTopBG'
                src={bgTop}
                alt=''
            />
            <div className='Footer__Container'>
                <FooterTop />
                <hr />
                <FooterBot />
            </div>
        </footer>
    );
};

export default Footer;
