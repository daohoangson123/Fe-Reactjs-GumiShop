import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './Good4MeSilder.css';
import good4me from '../../../../Assets/img/good4me.png';
import good4me2 from '../../../../Assets/img/good4me2.png';

const hashtag_Img = [
    {
        id: 1,
        url: good4me,
    },
    {
        id: 2,
        url: good4me2,
    },
];

const Good4MeSilder = () => {
    return (
        <section className='Good4MeSilder'>
            <h2>#GOOD4ME</h2>
            <OwlCarousel
                className='owl-theme owl-control'
                autoWidth={true}
                dots={false}
                margin={30}
                items={6}
                autoplay
                autoplaySpeed={2000}
                autoplayHoverPause
                autoplayTimeout={2500}
                loop
            >
                {hashtag_Img.map((img) => (
                    <div
                        className='item item1'
                        key={img.id}
                    >
                        <img
                            src={img.url}
                            alt={img.id}
                        />
                    </div>
                ))}
            </OwlCarousel>
        </section>
    );
};

export default Good4MeSilder;
