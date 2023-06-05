import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
//
import './Good4MeSilder.css';
//
import good4me from '../../../../../assets/img/good4me.webp';
import good4me2 from '../../../../../assets/img/good4me2.webp';
import SectionTitle from '../../../UI/SectionTitle/SectionTitle';

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

const Good4MeSilder = ({ title }) => {
    return (
        <section className='Good4MeSilder'>
            <SectionTitle content={title} />
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
                            src={null}
                            alt={img.id}
                            lazysrc={img.url}
                        />
                    </div>
                ))}
            </OwlCarousel>
        </section>
    );
};

export default Good4MeSilder;
