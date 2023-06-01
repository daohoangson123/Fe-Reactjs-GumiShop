import './NewsItem.css';
//
import { Link } from 'react-router-dom';

const NewsItem = ({ ...props }) => {
    return (
        <div className='NewsItem'>
            <div className='NewsItem_Container'>
                <img
                    src={props.url}
                    alt={props.title}
                />
                <div className='News_Date'>{props.date}</div>
                <div className='News_Title'>{props.title}</div>
                <p className='News_Content'>{props.content}</p>
                <Link
                    to={`/news/${props.id}`}
                    className='News_Btn'
                >
                    Latest Product's News
                </Link>
            </div>
        </div>
    );
};

export default NewsItem;
