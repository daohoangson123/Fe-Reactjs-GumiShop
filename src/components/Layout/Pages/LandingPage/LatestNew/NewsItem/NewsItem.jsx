import { useState } from 'react';
import './NewsItem.css';
//
import { Link } from 'react-router-dom';

const NewsItem = ({ id, url, date, title, content }) => {
    const [isload, setIsLoad] = useState(false);
    return (
        <div className='NewsItem'>
            <div className='NewsItem_Container'>
                <img
                    src={null}
                    alt=''
                    lazysrc={url}
                    style={{
                        animation: !isload && 'var(--imgLoading)',
                    }}
                    onLoad={() => {
                        setIsLoad(true);
                    }}
                />
                <div className='News_Date'>{date}</div>
                <div className='News_Title'>{title}</div>
                <p className='News_Content'>{content}</p>
                <Link
                    to={`/news/${id}`}
                    className='News_Btn'
                >
                    Latest Product's News
                </Link>
            </div>
        </div>
    );
};

export default NewsItem;
