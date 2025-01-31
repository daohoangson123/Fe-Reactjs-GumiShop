import FacebookIcon from '../components/Layout/UI/SVG/Icons/FacebookIcon';
import IngstaIcon from '../components/Layout/UI/SVG//Icons/IngstaIcon';
import PinterestIcon from '../components/Layout/UI/SVG//Icons/PinterestIcon';
import TwitterIcon from '../components/Layout/UI/SVG//Icons/TwitterIcon';
import YoutubeIcon from '../components/Layout/UI/SVG//Icons/YoutubeIcon';
//
import amex from '../assets/icon/amex.png';
import apay from '../assets/icon/apay.png';
import gpay from '../assets/icon/ggpay.png';
import mc from '../assets/icon/mc.png';
import pp from '../assets/icon/pp.png';
import spay from '../assets/icon/shoppay.png';
import visa from '../assets/icon/visa.png';

export const social_Icons = [
    {
        id: 'fb',
        path: 'https://www.facebook.com/',
        SVG: <FacebookIcon />,
    },
    {
        id: 'ig',
        path: 'https://www.instagram.com/',
        SVG: <IngstaIcon />,
    },
    {
        id: 'tw',
        path: 'https://twitter.com/',
        SVG: <TwitterIcon />,
    },
    {
        id: 'pi',
        path: 'https://www.pinterest.com/',
        SVG: <PinterestIcon />,
    },
    {
        id: 'yt',
        path: 'https://www.youtube.com/',
        SVG: <YoutubeIcon />,
    },
];

export const payment_Icons = [
    {
        url: amex,
        path: '/',
    },
    {
        url: apay,
        path: '/',
    },
    {
        url: gpay,
        path: '/',
    },
    {
        url: mc,
        path: '/',
    },
    {
        url: pp,
        path: '/',
    },
    {
        url: spay,
        path: '/',
    },
    {
        url: visa,
        path: '/',
    },
];
