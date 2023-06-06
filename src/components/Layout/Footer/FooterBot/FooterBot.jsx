import './FooterBot.css';
//
import { social_Icons, payment_Icons } from '../../../../data/footer_Icons';
//
import { Link } from 'react-router-dom';
import { useState } from 'react';

const FooterBot = () => {
    const [isload, setIsLoad] = useState(false);

    return (
        <div className='FooterBot'>
            <div className='SocialIcons FooterIcons'>
                {social_Icons.map((icon) => (
                    <a
                        href={icon.path}
                        key={icon.url}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <img
                            src={null}
                            alt='link'
                            lazysrc={icon.url}
                            style={{
                                animation: !isload && 'var(--imgLoading)',
                            }}
                            onLoad={() => {
                                setIsLoad(true);
                            }}
                        />
                    </a>
                ))}
            </div>
            <div className='CopyRight'>
                &#169; 2021, <span>GOOD4ME</span>. Powered by Shopify
            </div>
            <div className='PaymentIcons FooterIcons'>
                {payment_Icons.map((icon) => (
                    <Link
                        to={icon.path}
                        key={icon.url}
                    >
                        <img
                            src={null}
                            alt='link'
                            lazysrc={icon.url}
                            style={{
                                animation: !isload && 'var(--imgLoading)',
                            }}
                            onLoad={() => {
                                setIsLoad(true);
                            }}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FooterBot;
