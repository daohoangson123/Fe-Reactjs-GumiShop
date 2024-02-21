import './Good4MeDealBot.css';
//
import { g4mBot_items } from '../../../../../../data/g4mBot';
import { useEffect } from 'react';

const Good4MeDealBot = () => {
    useEffect(() => {
        function load(item) {
            item.classList.add('animated-fade-in');
        }

        const animated = document.querySelectorAll('.Good4MeDealBot_Item');

        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    load(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        animated.forEach((item) => {
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className='Good4MeDealBot'>
            {g4mBot_items.map((item, index) => (
                <div
                    className='Good4MeDealBot_Item'
                    key={item.title}
                    style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className='Img_Container'>
                        <span className='Good4MeDealBot_Item-Circle'></span>
                        <img
                            src={null}
                            alt=''
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
