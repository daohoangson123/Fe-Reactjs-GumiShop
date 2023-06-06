import './Good4MeDealBot.css';
//
import { useState } from 'react';
//
import { g4mBot_items } from '../../../../../../data/g4mBot';

const Good4MeDealBot = () => {
    const [isload, setIsLoad] = useState(false);

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
                            alt=''
                            style={{
                                animation: !isload && 'var(--imgLoading)',
                            }}
                            lazysrc={item.url}
                            onLoad={() => setIsLoad(true)}
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
