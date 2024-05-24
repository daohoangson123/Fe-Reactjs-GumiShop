import './LatestNews.css';
//
import { news_Items } from '../../../../../data/news';
//
import NewsItem from './NewsItem/NewsItem';
import SectionTitle from '../../../UI/SectionTitle/SectionTitle';
import { useEffect } from 'react';
import animationCheck from '../../../../../data/animationCheck';

const LatestNew = ({ title }) => {
    useEffect(() => {
        animationCheck(
            '.LatestNew * .NewsItem',
            'animated-slide-up',
            '0px',
            0.5
        );
    }, []);

    return (
        <section className="LatestNew Container">
            <SectionTitle content={title} />
            <div className="LatestNew_Container">
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
