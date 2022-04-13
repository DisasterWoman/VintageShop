import { SliderImages } from '../data/SliderImages';
import React from 'react';

function Carousel({ slides }) {
    const [current, setCurrent] = React.useState(0);
    const length = slides.length;
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }
    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }
    return (
        <section className="slider d-flex justify-center flex-wrap mb-20">
            <div className="carouselWrap d-flex align-center">
                <img onClick={nextSlide} className="btn left mr-50" width={13} height={13} src='gitimages/left.svg'></img>
                {SliderImages.map((slide, index) => {
                    return (
                        <div className={index === current ? 'slide active' : 'slide'} key={index}>
                            {
                                index === current && (<img src={slide.image} onClick={nextSlide} className='image' ></img>
                                )}
                        </div>
                    )
                }
                )}
                <img onClick={prevSlide} className="btn right ml-50" width={13} height={13} src='images/right.svg'></img>

            </div>
        </section>
    )
}
export default Carousel;

