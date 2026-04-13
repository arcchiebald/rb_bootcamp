import { useState, useEffect } from 'react';
import hero1 from '../assets/hero/1.png';
import hero2 from '../assets/hero/2.png';
import hero3 from '../assets/hero/3.png';
import Button from './Button';

const slides = [
    {
        id: 1,
        title: "Start learning something new today",
        description: `Explore a wide range of expert-led courses in design, 
        development, business, and more. Find the skills you need to grow your 
        career and learn at your own pace.`,
        buttonText: "Browse Courses",
        image: hero1,
        bgPos: "center -300px"
    },
    {
        id: 2, title: "Pick up where you left off",
        description: `Your learning journey is already in progress. 
        Continue your enrolled courses, track your progress, 
        and stay on track toward completing your goals.`,
        buttonText: "Start Learning",
        image: hero2,
        bgPos: "center -150px"
    },
    {
        id: 3,
        description: `‎`,
        buttonText: "Learn More",
        title: "Learn together, grow faster",
        image: hero3,
        bgPos: "center -60px"
    },
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    return (

        <div className="w-391.5 h-105 overflow-hidden rounded-[30px] relative">
            {/* Slider Track */}
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="w-full shrink-0 h-full p-12 bg-cover bg-no-repeat flex flex-col"
                        style={{
                            backgroundImage: `url(${slide.image})`,
                            backgroundPosition: slide.bgPos
                        }}
                    >
                        <div className='flex flex-col w-304.5 items-start text-greyscale-50 gap-10'>
                            <h1 className="type-display-xl">{slide.title}</h1>
                            <p className='type-body-light-xl '>{slide.description}</p>
                            <Button variant='primary' className='w-fit px-8'>{slide.buttonText}</Button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination Bars */}
            <div className='absolute bottom-15 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10'>
                {slides.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-14.25 h-2 rounded-full cursor-pointer transition-all duration-500 ${
                            currentSlide === index ? 'bg-greyscale-50' : 'bg-greyscale-light'
                        }`}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <div className='absolute bottom-12 right-12 flex items-center gap-6 z-10'>
                <button onClick={prevSlide} className={`hover:opacity-80 transition-opacity cursor-pointer ${currentSlide === 0 ? 'text-greyscale-light' : 'text-greyscale-50'}`}>
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.9375 0C17.5987 0 13.3573 1.28661 9.74969 3.69714C6.14208 6.10766 3.3303 9.53383 1.6699 13.5424C0.00950518 17.5509 -0.42493 21.9618 0.421533 26.2173C1.268 30.4728 3.35734 34.3816 6.42535 37.4497C9.49337 40.5177 13.4023 42.607 17.6577 43.4535C21.9132 44.2999 26.3241 43.8655 30.3326 42.2051C34.3412 40.5447 37.7673 37.7329 40.1779 34.1253C42.5884 30.5177 43.875 26.2763 43.875 21.9375C43.8689 16.1212 41.5556 10.5449 37.4429 6.43213C33.3301 2.31938 27.7538 0.00614212 21.9375 0ZM21.9375 40.5C18.2662 40.5 14.6773 39.4113 11.6247 37.3717C8.57215 35.332 6.19295 32.4329 4.788 29.0411C3.38304 25.6492 3.01544 21.9169 3.73168 18.3161C4.44792 14.7154 6.21583 11.4078 8.81184 8.81183C11.4079 6.21582 14.7154 4.44791 18.3161 3.73167C21.9169 3.01543 25.6492 3.38303 29.0411 4.78799C32.4329 6.19294 35.332 8.57214 37.3717 11.6247C39.4113 14.6773 40.5 18.2662 40.5 21.9375C40.4944 26.8589 38.5369 31.5771 35.057 35.057C31.5771 38.5369 26.8589 40.4944 21.9375 40.5ZM26.5064 14.6939L19.2607 21.9375L26.5064 29.1811C26.6632 29.3379 26.7876 29.524 26.8724 29.7289C26.9573 29.9337 27.0009 30.1533 27.0009 30.375C27.0009 30.5967 26.9573 30.8163 26.8724 31.0211C26.7876 31.226 26.6632 31.4121 26.5064 31.5689C26.3496 31.7257 26.1635 31.8501 25.9586 31.9349C25.7538 32.0198 25.5342 32.0634 25.3125 32.0634C25.0908 32.0634 24.8712 32.0198 24.6664 31.9349C24.4615 31.8501 24.2754 31.7257 24.1186 31.5689L15.6811 23.1314C15.5242 22.9747 15.3997 22.7886 15.3148 22.5837C15.2299 22.3789 15.1862 22.1593 15.1862 21.9375C15.1862 21.7157 15.2299 21.4961 15.3148 21.2913C15.3997 21.0864 15.5242 20.9003 15.6811 20.7436L24.1186 12.3061C24.2754 12.1493 24.4615 12.0249 24.6664 11.9401C24.8712 11.8552 25.0908 11.8116 25.3125 11.8116C25.5342 11.8116 25.7538 11.8552 25.9586 11.9401C26.1635 12.0249 26.3496 12.1493 26.5064 12.3061C26.6632 12.4629 26.7876 12.649 26.8724 12.8539C26.9573 13.0587 27.0009 13.2783 27.0009 13.5C27.0009 13.7217 26.9573 13.9413 26.8724 14.1461C26.7876 14.351 26.6632 14.5371 26.5064 14.6939Z" fill="currentColor"/>
                    </svg>
                </button>
                <button onClick={nextSlide} className={`hover:opacity-80 transition-opacity cursor-pointer ${currentSlide === slides.length - 1 ? 'text-greyscale-light' : 'text-greyscale-50'}`}>
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.9375 0C17.5987 0 13.3573 1.28661 9.74969 3.69714C6.14208 6.10766 3.3303 9.53383 1.6699 13.5424C0.00950518 17.5509 -0.42493 21.9618 0.421533 26.2173C1.268 30.4728 3.35734 34.3816 6.42535 37.4497C9.49337 40.5177 13.4023 42.607 17.6577 43.4535C21.9132 44.2999 26.3241 43.8655 30.3326 42.2051C34.3412 40.5447 37.7673 37.7329 40.1779 34.1253C42.5884 30.5177 43.875 26.2763 43.875 21.9375C43.8689 16.1212 41.5556 10.5449 37.4429 6.43213C33.3301 2.31938 27.7538 0.00614212 21.9375 0ZM21.9375 40.5C18.2662 40.5 14.6773 39.4113 11.6247 37.3717C8.57215 35.332 6.19295 32.4329 4.788 29.0411C3.38304 25.6492 3.01544 21.9169 3.73168 18.3161C4.44792 14.7154 6.21583 11.4078 8.81184 8.81183C11.4079 6.21582 14.7154 4.44791 18.3161 3.73167C21.9169 3.01543 25.6492 3.38303 29.0411 4.78799C32.4329 6.19294 35.332 8.57214 37.3717 11.6247C39.4113 14.6773 40.5 18.2662 40.5 21.9375C40.4944 26.8589 38.5369 31.5771 35.057 35.057C31.5771 38.5369 26.8589 40.4944 21.9375 40.5ZM28.1939 20.7436C28.3508 20.9003 28.4753 21.0864 28.5602 21.2913C28.6451 21.4961 28.6888 21.7157 28.6888 21.9375C28.6888 22.1593 28.6451 22.3789 28.5602 22.5837C28.4753 22.7886 28.3508 22.9747 28.1939 23.1314L19.7564 31.5689C19.5996 31.7257 19.4135 31.8501 19.2086 31.9349C19.0038 32.0198 18.7842 32.0634 18.5625 32.0634C18.3408 32.0634 18.1212 32.0198 17.9164 31.9349C17.7115 31.8501 17.5254 31.7257 17.3686 31.5689C17.2118 31.4121 17.0874 31.226 17.0026 31.0211C16.9177 30.8163 16.8741 30.5967 16.8741 30.375C16.8741 30.1533 16.9177 29.9337 17.0026 29.7289C17.0874 29.524 17.2118 29.3379 17.3686 29.1811L24.6143 21.9375L17.3686 14.6939C17.052 14.3773 16.8741 13.9478 16.8741 13.5C16.8741 13.0522 17.052 12.6227 17.3686 12.3061C17.6852 11.9894 18.1147 11.8116 18.5625 11.8116C19.0103 11.8116 19.4398 11.9894 19.7564 12.3061L28.1939 20.7436Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default HeroSlider