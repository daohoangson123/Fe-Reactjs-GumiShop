import './LatestNews.css';
//
import { news_Items } from '../../../../../Data/news';
//
import NewsItem from '../NewsItem/NewsItem';

const LatestNew = () => {
    return (
        <section className='LatestNew container'>
            <h2>LATEST NEWS</h2>
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
