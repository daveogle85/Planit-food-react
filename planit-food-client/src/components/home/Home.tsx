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
    { meals: ['meal1'] },
    { meals: ['meal2'] },
    { meals: ['meal3'] },
    { meals: ['meal4'] },
    { meals: ['meal5'] }
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