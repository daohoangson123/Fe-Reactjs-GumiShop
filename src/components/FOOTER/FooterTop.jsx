import { Link } from 'react-router-dom';
import './FooterTop.css';

const info_List = [
    {
        path: '/',
        name: 'Shipping & Delivery',
    },
    {
        path: '/',
        name: 'Refund Policy',
    },
    {
        path: '/',
        name: 'Partner Program',
    },
    {
        path: '/',
        name: 'Wholesale Portal',
    },
    {
        path: '/',
        name: 'You Buy, We Donate',
    },
    {
        path: '/',
        name: 'Privacy Policy',
    },
    {
        path: '/',
        name: 'Terms & Conditions',
    },
]

const FooterTop = () => {
    return (
        <div className='FooterTop'>
            <div className='FooterTop_Item1'>
                <div className='NavBar__Logo FooterTop_Item1-Logo'>GOOD<span>4</span>ME</div>
                <p className='FooterTop_Item1-content'>Good health is important, so all of our products have been carefully designed to bring out the best in you.</p>
            </div>
            <div className='FooterTop_Item2'>
                <div className='FooterTop_Item2-title'>Keep In Touch</div>
                <p className='FooterTop_Item2-content'>Subscribe to receive new product updates, be the first to know about sales, and more.</p>
                <form action="" className='FooterTop_Item2-form'>
                    <input autoComplete='off' type="email" name='email' id='email'
                    className='FooterTop_Item2-input'
                    placeholder='Enter your email address'
                    required
                    />
                    <button onClick={(e) => {}} className='FooterTop_Item2-btn'>SUBSCRIBE</button>
                </form>
            </div>
            <div className='FooterTop_Item3'>
                <div className='FooterTop_Item3-title'>MORE INFO</div>
                <div className='FooterTop_Item3-InfoList'>
                    {info_List.map((info) => (
                        <div className='InfoList-item' key={info.name}>
                            <Link to={info.path}>
                                {info.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FooterTop;