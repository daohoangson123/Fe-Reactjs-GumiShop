import './Good4MeDealBot.css';
//
import { g4mBot_items } from '../../../../../../data/g4mBot';
import { useEffect } from 'react';
import animationCheck from '../../../../../../data/animationCheck';

const Good4MeDealBot = () => {
    useEffect(() => {
        animationCheck('.Good4MeDealBot_Item', 'animated-fade-in', '0px', 0.9);
    }, []);

    return (
        <div className="Good4MeDealBot">
            {g4mBot_items.map((item, index) => (
                <div
                    className="Good4MeDealBot_Item"
                    key={item.title}
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="Good4MeDealBot_ItemContainer">
                        <span className="Good4MeDealBot_Item-Circle"></span>
                        <div className="Good4MeDealBot_Item-SVG">
                            {item.SVG}
                        </div>
                    </div>
                    <div className="Good4MeDealBot_Item-Title">
                        {item.title}
                    </div>
                    <p className="Good4MeDealBot_Item-Content">
                        {item.content}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Good4MeDealBot;
