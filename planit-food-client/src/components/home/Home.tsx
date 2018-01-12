import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselProps } from 'react-responsive-carousel';
import DayCard from './day-card/DayCard';
import { CardCarouselType } from '../../Models/Carousel';

import './Home.css';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

const CardCarousel: CardCarouselType<CarouselProps> = Carousel as CardCarouselType<CarouselProps>;

/**
 * using https://github.com/leandrowd/react-responsive-carousel
 */

// Some mock days
const days = [
    { meals: [{id: '1', name: 'meal1'}] },
    { meals: [{ id: '2', name: 'meal1' }] },
    { meals: [{ id: '3', name: 'meal1' }] },
    { meals: [{ id: '4', name: 'meal1' }, { id: '5', name: 'meal2' }] },
    { meals: [{ id: '6', name: 'meal1' }] },
];

class Home extends Component {
    public render() {
        return (
            <div className="Home">
                <Link to={`/calendar`} className="nav-link">
                    Go to calendar
                </Link>
                <CardCarousel
                    centerMode={true}
                    centerSlidePercentage={40}
                    dynamicHeight={true}
                    showStatus={false}
                    showThumbs={false}
                >
                    {
                        days.map((day, i) =>
                            <DayCard
                                key={i}
                                mealList={day.meals}
                            />
                        )
                    }
                </CardCarousel>
            </div>
        );
    }
}

export default Home;