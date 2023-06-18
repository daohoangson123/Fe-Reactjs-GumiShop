import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//
import './Good4MeSilder.css';
//
import { bottom_Slider } from '../../../../../data/bottomSlider';
//
import SectionTitle from '../../../UI/SectionTitle/SectionTitle';

const Good4MeSilder = ({ title }) => {
    return (
        <section className='Good4MeSilder hide'>
            <SectionTitle content={title} />
            <OwlCarousel
                className='owl-theme owl-control'
                autoWidth={true}
                dots={false}
                margin={20}
                items={8}
                autoplay
                autoplayHoverPause
                autoplaySpeed={3000}
                autoplayTimeout={4000}
                loop
            >
                {bottom_Slider.map((img) => (
                    <div
                        className='item'
                        key={img.id}
                    >
                        <img
                            src={img.url}
                            alt=''
                        />
                    </div>
                ))}
            </OwlCarousel>
        </section>
    );
};

export default Good4MeSilder;
