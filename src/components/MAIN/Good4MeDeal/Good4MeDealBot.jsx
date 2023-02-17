import './Good4MeDealBot.css';
import plane from '../../../icon/plane.png';
import money from '../../../icon/money.png';
import lock from '../../../icon/lock.png';

const items_List = [
    {
        url: plane,
        title: "WORLDWIDE SHIPPING",
        content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean",
    },
    {
        url: money,
        title: "30 DAYS GUARANTEE",
        content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean",
    },
    {
        url: lock,
        title: "SECURED PAYMENTS",
        content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean",
        width: "50px",
    },
]

const Good4MeDealBot = () => {
    return (
        <div className='Good4MeDealBot'>
            {items_List.map((item) => (
                <div className='Good4MeDealBot_Item' key={item.title}>
                    <div className='Img_Container'>
                        <span></span>
                        <img src={item.url} alt={item.title} style={{width: item.width}} />
                    </div>
                    <div className='Good4MeDealBot_Item-title'>{item.title}</div>
                    <p className='Good4MeDealBot_Item-content'>{item.content}</p>
                </div>
            ))}
        </div>
    )
}

export default Good4MeDealBot;