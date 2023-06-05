import './Good4MeDealBot.css';
//
import { g4mBot_items } from '../../../../../../data/g4mBot';

const Good4MeDealBot = () => {
    return (
        <div className='Good4MeDealBot'>
            {g4mBot_items.map((item) => (
                <div
                    className='Good4MeDealBot_Item'
                    key={item.title}
                >
                    <div className='Img_Container'>
                        <span className='Good4MeDealBot_Item-Circle'></span>
                        <img
                            src={null}
                            alt={item.title}
                            style={{ width: item.width }}
                            lazysrc={item.url}
                        />
                    </div>
                    <div className='Good4MeDealBot_Item-Title'>
                        {item.title}
                    </div>
                    <p className='Good4MeDealBot_Item-Content'>
                        {item.content}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Good4MeDealBot;
