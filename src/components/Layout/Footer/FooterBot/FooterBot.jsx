import './FooterBot.css';
//
import { social_Icons, payment_Icons } from '../../../../data/footer_Icons';
//
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const FooterBot = () => {
    return (
        <div className='FooterBot'>
            <div className='SocialIcons FooterIcons'>
                {social_Icons ? (
                    social_Icons.map((icon) => (
                        <a
                            href={icon.path}
                            key={icon.url}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <img
                                src={icon.url}
                                alt='link'
                            />
                        </a>
                    ))
                ) : (
                    <>
                        <Skeleton
                            width={30}
                            height={30}
                        />
                        <Skeleton
                            width={30}
                            height={30}
                        />
                        <Skeleton
                            width={30}
                            height={30}
                        />
                        <Skeleton
                            width={30}
                            height={30}
                        />
                        <Skeleton
                            width={30}
                            height={30}
                        />
                    </>
                )}
            </div>
            <div className='CopyRight'>
                &#169; 2021, <span>GOOD4ME</span>. Powered by Shopify
            </div>
            <div className='PaymentIcons FooterIcons'>
                {payment_Icons ? (
                    payment_Icons.map((icon) => (
                        <Link
                            to={icon.path}
                            key={icon.url}
                        >
                            <img
                                src={icon.url}
                                alt='link'
                            />
                        </Link>
                    ))
                ) : (
                    <>
                        <Skeleton
                            width={30}
                            height={20}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default FooterBot;
