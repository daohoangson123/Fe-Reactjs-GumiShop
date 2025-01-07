import './FooterBot.css';
//
import { social_Icons, payment_Icons } from '../../../../data/footer_Icons';
//
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const FooterBot = () => {
    return (
        <div className="FooterBot">
            <div className="SocialIcons FooterIcons">
                {social_Icons ? (
                    social_Icons.map((icon) => (
                        <a
                            href={icon.path}
                            key={icon.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img src={''} alt="link" lazysrc={icon.url} />
                        </a>
                    ))
                ) : (
                    <>
                        <Skeleton width={20} height={20} />
                        <Skeleton width={20} height={20} />
                        <Skeleton width={20} height={20} />
                        <Skeleton width={20} height={20} />
                        <Skeleton width={20} height={20} />
                    </>
                )}
            </div>
            <div className="CopyRight">
                &#169; 2021, <span>GOOD4ME</span>. Powered by Shopify
            </div>
            <div className="PaymentIcons FooterIcons">
                {payment_Icons ? (
                    payment_Icons.map((icon) => (
                        <Link to={icon.path} key={icon.url}>
                            <img src={''} alt="link" lazysrc={icon.url} />
                        </Link>
                    ))
                ) : (
                    <>
                        <Skeleton width={30} height={20} />
                    </>
                )}
            </div>
        </div>
    );
};

export default FooterBot;
