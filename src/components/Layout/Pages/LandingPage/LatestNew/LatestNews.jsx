import './LatestNews.css';
//
import { news_Items } from '../../../../../data/news';
//
import NewsItem from './NewsItem/NewsItem';
import SectionTitle from '../../../UI/SectionTitle/SectionTitle';

const LatestNew = ({ title }) => {
    return (
        <section className='LatestNew Container'>
            <SectionTitle content={title} />
            <div className='LatestNew_Container'>
                {news_Items.map((item) => (
                    <NewsItem
                        key={item.id}
                        id={item.id}
                        url={item.url}
                        date={item.date}
                        title={item.title}
                        content={item.content}
                    />
                ))}
            </div>
        </section>
    );
};

export default LatestNew;
