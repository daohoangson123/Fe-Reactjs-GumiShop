import n1 from '../../../../../Assets/img/news1.png';
import n2 from '../../../../../Assets/img/news2.png';
import n3 from '../../../../../Assets/img/news3.png';
import './LatestNew.css';
import NewsItem from '../NewsItem/NewsItem';

export const news_List = [
    {
        id: 1,
        url: n1,
        date: 'August 26, 2020',
        title: 'WE DONATE ONE WEEKS SUPPLY',
        content:
            'We care about New Zealand children, and we want to support our community by providing our children in need with necessary vitamins to improve....',
    },
    {
        id: 2,
        url: n2,
        date: 'August 26, 2020',
        title: 'WE DONATE ONE WEEKS SUPPLY',
        content:
            'We care about New Zealand children, and we want to support our community by providing our children in need with necessary vitamins to improve....',
    },
    {
        id: 3,
        url: n3,
        date: 'August 26, 2020',
        title: 'WE DONATE ONE WEEKS SUPPLY',
        content:
            'We care about New Zealand children, and we want to support our community by providing our children in need with necessary vitamins to improve....',
    },
];

const LatestNew = () => {
    return (
        <section className='LatestNew container'>
            <h2>LATEST NEWS</h2>
            <div className='LatestNew_Container'>
                {news_List.map((item) => (
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
