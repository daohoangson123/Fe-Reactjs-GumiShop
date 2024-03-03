import './NewsDetail.css';
//
import { news_Items } from '../../../../../../data/news';
//
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

const NewsDetail = () => {
    const { id } = useParams();
    const [newsdetail, setNewsdetail] = useState([]);

    const handleClick = () => {
        window.history.back();
    };

    useEffect(() => {
        const newsTemp = news_Items.find((news) => news.id.toString() === id);
        setNewsdetail([newsTemp]);
    }, [id]);

    return (
        <section className="NewDetail container">
            {newsdetail.map((news) => (
                <div className="NewDetail__Item" key={news.id}>
                    <div className="NewDetail__Item-Date">{news.date}</div>
                    <img src={news.url} alt="newsImg" />
                    <div className="NewDetail__Item-Title">{news.title}</div>
                    <div className="NewDetail__Item-Content">
                        {news.content}
                    </div>
                    <button
                        className="NewDetail__Item-Btn"
                        type="button"
                        onClick={handleClick}
                    >
                        Go Back
                    </button>
                </div>
            ))}
        </section>
    );
};

export default NewsDetail;
