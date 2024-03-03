import Loading from '../../UI/Loading/Loading';
import './ContactPage.css';
//
import { useState } from 'react';

const ContactPage = () => {
    const [mapLoaded, setMapLoaded] = useState(false);

    return (
        <div className="ContactPage">
            <div className="Contact__Content container">
                <div className="Contact__Info">
                    <div className="Contact-ShopName">
                        Gumi Shop - Beauty Vitamins
                    </div>
                    <div className="Contact-ShopInfo">
                        <address>
                            Visit us at: XX/YY, 123 ABC, DEF, 456789
                            <br />
                            Service-line:{' '}
                            <a href="tel:+0123456789">+0123-456-789</a> or{' '}
                            <a href="tel:+9876543210">+9876-543-210</a>
                            <br />
                            Send us e-mail:{' '}
                            <a href="mailto:gumishopvitas@gmail.com">
                                gumishopvitas@gmail.com
                            </a>
                        </address>
                    </div>
                </div>
                <div className="Contact-Form">
                    <form action="">
                        <div className="Contact-Form-Deco">
                            <div>Contact Us</div>
                        </div>
                        <input
                            className="FullName"
                            type="text"
                            name="Contactname"
                            id="Contactname"
                            placeholder="Full Name"
                            autoComplete="off"
                        />
                        <input
                            className="Tel"
                            type="tel"
                            name="Contactphone"
                            id="Contactphone"
                            placeholder="Phone Number"
                            autoComplete="off"
                        />
                        <input
                            className="Email"
                            type="email"
                            name="Contactmail"
                            id="Contactmail"
                            placeholder="Your E-mail"
                            autoComplete="off"
                        />
                        <textarea
                            className="Issue"
                            type="text"
                            name="Contactissue"
                            id="Contactissue"
                            placeholder="Your Issue"
                            autoComplete="off"
                        ></textarea>
                        <button
                            onClick={(event) => {
                                event.preventDefault();
                            }}
                            className="Contact-Btn"
                        >
                            Send Issue
                        </button>
                    </form>
                </div>
            </div>
            <div className="Contact__map">
                {!mapLoaded && <Loading />}
                <iframe
                    title="GumiMap"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15336.601810128106!2d108.22653481836132!3d16.057680600516186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142191085cecb33%3A0x650db473791ad850!2sGumi%20Shop!5e0!3m2!1svi!2s!4v1678175649703!5m2!1svi!2s"
                    loading="lazy"
                    onLoad={() => setMapLoaded(true)}
                ></iframe>
            </div>
        </div>
    );
};

export default ContactPage;
