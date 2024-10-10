import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//
import './Good4MeSlider.css';
//
import { bottom_Slider } from '../../../../../data/bottomSlider';
//
import SectionTitle from '../../../UI/SectionTitle/SectionTitle';

const Good4MeSilder = ({ title }) => {
    return (
        <section className="Good4MeSilder">
            <SectionTitle content={title} />
            <OwlCarousel
                className="owl-control owl-theme"
                autoWidth={true}
                dots={false}
                items={5}
                // autoplay
                margin={30}
                autoplayHoverPause
                autoplaySpeed={3000}
                autoplayTimeout={4000}
                loop
            >
                {bottom_Slider.map((img) => (
                    <div className="item" key={img.id}>
                        <img src={img.url} alt="" />
                    </div>
                ))}
            </OwlCarousel>
        </section>
    );
};

export default Good4MeSilder;
