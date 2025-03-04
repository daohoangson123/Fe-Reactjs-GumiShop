import { useEffect } from 'react';
import { faqList } from '../../../../data/faq';
import './FaqPage.css';
//
import Accordion from 'react-bootstrap/Accordion';

const FaqPage = () => {
    useEffect(() => {
        document.title = 'Gumi Shopify - FAQ';
    }, []);
    return (
        <div className="FaqPage Container">
            <div className="FaqPage__Title">FAQ</div>
            <div className="FaqPage__Content">
                <Accordion defaultActiveKey="0">
                    {faqList.map((faq, index) => (
                        <div key={faq.title}>
                            <Accordion.Item eventKey={`${index}`}>
                                <Accordion.Header>{faq.title}</Accordion.Header>
                                <Accordion.Body>{faq.content}</Accordion.Body>
                            </Accordion.Item>
                        </div>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default FaqPage;
