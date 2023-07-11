import { faqList } from '../../../../data/faq';
import './FaqPage.css';
//
import Accordion from 'react-bootstrap/Accordion';

const FaqPage = () => {
    return (
        <div className='FaqPage Container'>
            <div className='FaqPage__Title'>FAQ</div>
            <div className='FaqPage__Content'>
                <Accordion defaultActiveKey='0'>
                    {faqList.map((faq, index) => (
                        <>
                            <Accordion.Item
                                eventKey={`${index}`}
                                key={faq.title}>
                                <Accordion.Header>{faq.title}</Accordion.Header>
                                <Accordion.Body>{faq.content}</Accordion.Body>
                            </Accordion.Item>
                        </>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default FaqPage;
