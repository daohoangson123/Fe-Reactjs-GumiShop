import './NewsItem.css';
//
import { Link } from 'react-router-dom';

const NewsItem = ({ id, url, date, title, content, index }) => {
    return (
        <div
            className="NewsItem"
            style={{
                animationDelay: `${index * 0.2}s`,
            }}
        >
            <img src={url} alt="" loading="lazy" />
            <div className="News_Date">{date}</div>
            <div className="News_Title">{title}</div>
            <p className="News_Content">{content}</p>
            <Link to={`/news/${id}`} className="News_Btn">
                Latest Product's News
            </Link>
        </div>
    );
};

export default NewsItem;
