import n1 from '../../../img/news1.png';
import n2 from '../../../img/news2.png';
import n3 from '../../../img/news3.png';
import './LatestNew.css';
import NewsItem from './NewsItem';

const news_List = [
    {
        id: 1,
        url: n1,
        date: 'August 26, 2020',
        title: 'WE DONATE ONE WEEKS SUPPLY',
        content: 'We care about New Zealand children, and we want to support our community by providing our children in need with necessary vitamins to improve....',
        path: '/',
    },
    {
        id: 2,
        url: n2,
        date: 'August 26, 2020',
        title: 'WE DONATE ONE WEEKS SUPPLY',
        content: 'We care about New Zealand children, and we want to support our community by providing our children in need with necessary vitamins to improve....',
        path: '/',
    },
    {
        id: 3,
        url: n3,
        date: 'August 26, 2020',
        title: 'WE DONATE ONE WEEKS SUPPLY',
        content: 'We care about New Zealand children, and we want to support our community by providing our children in need with necessary vitamins to improve....',
        path: '/',
    },
]

const LatestNew = () => {
    return (
        <div className='LatestNew'>
            <h2>LATEST NEWS</h2>
            <div className='LatestNew_Container'>
                {news_List.map((item) => (
                    <NewsItem key={item.id}
                    url={item.url}
                    date={item.date}
                    title={item.title}
                    content={item.content}
                    path={item.path}
                    />
                ))}
            </div>
        </div>
    )
}

export default LatestNew;