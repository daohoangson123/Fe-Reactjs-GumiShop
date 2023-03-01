import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Review.css';
import review_img from '../../../img/review.png';

const reviewData = [
    {
        name: "_Chloe H.",
        review: "“We have perfected our formulas over time, based on your feedback. Check out hundreds of reviews on our website.We can't wait until you are a part of our Good4Me Family.”",
        rating: [1, 1, 1, 1, 0],
    },
    {
        name: "_Tess A.",
        review: "“We have perfected our formulas over time, based on your feedback. Check out hundreds of reviews on our website.We can't wait until you are a part of our Good4Me Family.”",
        rating: [1, 1, 1, 1, 1],
    }
]

const Review = () => {
    return (
        <section className='Review'>
            <div className='Review__Slider-BgTop'></div>
            <div className='Review__Slider'>
                <OwlCarousel className='owl-theme' items={1} nav={true} dots={false}>
                    {reviewData.map((review) => (
                        <div className='Review__Slider-Item' key={review.name}>
                            <div className='Review__Slider-Item-Title'>REAL REVIEWS</div>
                            <div className='Review__Slider-Item-SubTitle'>REAL RESULTS</div>
                            <div className='Review__Slider-Item-Rating'>
                                {review.rating.map((star, index) => (
                                    <i className="fa-solid fa-star" key={index} style={{display: "inline-block", width: "20px", height: "20px", color: star === 1 ? "#FFC107" : "#D8D8D8"}}></i>
                                ))}
                            </div>
                            <p className='Review__Slider-Item-Review'>{review.review}</p>
                            <div className='Review__Slider-Item-Name'>{review.name}</div>
                        </div>
                    ))}
                </OwlCarousel>
            </div>
            <div>
                <img className='Review__Img' src={review_img} alt="review_img" />
            </div>
            <div className='Review__Slider-BgBot'></div>
        </section>
    )
}

export default Review;