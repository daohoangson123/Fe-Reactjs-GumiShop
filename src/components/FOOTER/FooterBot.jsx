import fb from '../../icon/fb.png';
import ig from '../../icon/ig.png';
import tw from '../../icon/tw.png';
import pi from '../../icon/pi.png';
import yt from '../../icon/yt.png';
import amex from '../../icon/amex.png';
import apay from '../../icon/apay.png';
import gpay from '../../icon/ggpay.jpg';
import mc from '../../icon/mc.png';
import pp from '../../icon/pp.png';
import spay from '../../icon/shoppay.png';
import visa from '../../icon/visa.png';
import './FooterBot.css';
import { Link } from 'react-router-dom';

const socialIcons_List = [
    {
        url: fb,
        href: "https://www.facebook.com/",
    },
    {
        url: ig,
        href: "https://www.instagram.com/",
    },
    {
        url: tw,
        href: "https://twitter.com/",
    },
    {
        url: pi,
        href: "https://www.pinterest.com/",
    },
    {
        url: yt,
        href: "https://www.youtube.com/",
    },
]

const payIcons_List = [
    {
        url: amex,
    },
    {
        url: apay,
    },
    {
        url: gpay,
    },
    {
        url: mc,
    },
    {
        url: pp,
    },
    {
        url: spay,
    },
    {
        url: visa,
    },
]

const FooterBot = () => {
    return (
        <div className='FooterBot container'>
            <div className="SocialIcons FooterIcons">
                {socialIcons_List.map((icon) => (
                    <a href={icon.href} key={icon.url} target='_blank' rel="noreferrer">
                        <img src={icon.url} alt="SocialIcons" />
                    </a>
                ))}
            </div>
            <div className="CopyRight">
                &#169; 2021, <span>GOOD4ME</span>. Powered by Shopify
            </div>
            <div className="PaymentIcons FooterIcons">
                {payIcons_List.map((icon) => (
                    <Link to='/payment' key={icon.url}>
                        <img src={icon.url} alt="PayIcons" />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default FooterBot;