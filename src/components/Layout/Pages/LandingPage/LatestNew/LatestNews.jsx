import './LatestNews.css';
//
import { news_Items } from '../../../../../data/news';
//
import NewsItem from './NewsItem/NewsItem';
import SectionTitle from '../../../UI/SectionTitle/SectionTitle';
import { useEffect } from 'react';

const LatestNew = ({ title }) => {
    useEffect(() => {
        function load(item) {
            item.classList.add('animated-slide-up');
        }

        const animated = document.querySelectorAll('.LatestNew * .NewsItem');

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
        <section className='LatestNew Container'>
            <SectionTitle content={title} />
            <div className='LatestNew_Container'>
                {news_Items.map((item, index) => (
                    <NewsItem
                        key={item.id}
                        id={item.id}
                        url={item.url}
                        date={item.date}
                        title={item.title}
                        content={item.content}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};

export default LatestNew;
