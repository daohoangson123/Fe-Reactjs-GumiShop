import './Review.css';
//
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//
import review_img from '../../../../../assets/img/review.webp';
//
import { reviewData } from '../../../../../data/review';

const Review = () => {
    return (
        <section className='Review Container'>
            <div className='Review__Slider'>
                <OwlCarousel
                    className='owl-theme'
                    items={1}
                    nav={true}
                    dots={false}
                    margin={100}
                    responsiveRefreshRate={0}
                >
                    {reviewData.map((review) => (
                        <div
                            className='Review__Slider-Item'
                            key={review.name}
                        >
                            <div className='Review__Slider-Item-Title'>
                                REAL REVIEWS
                            </div>
                            <div className='Review__Slider-Item-SubTitle'>
                                REAL RESULTS
                            </div>
                            <div className='Review__Slider-Item-Rating'>
                                {review.rating.map((star, index) => (
                                    <i
                                        className='fa-solid fa-star'
                                        key={index}
                                        style={{
                                            display: 'inline-block',
                                            width: '20px',
                                            height: '20px',
                                            color:
                                                star === 1
                                                    ? '#FFC107'
                                                    : '#D8D8D8',
                                        }}
                                    ></i>
                                ))}
                            </div>
                            <p className='Review__Slider-Item-Review'>
                                {review.review}
                            </p>
                            <div className='Review__Slider-Item-Name'>
                                {review.name}
                            </div>
                        </div>
                    ))}
                </OwlCarousel>
            </div>
            <div className='Review__Img'></div>
        </section>
    );
};

export default Review;
