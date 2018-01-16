import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselProps } from 'react-responsive-carousel';
import DayCard from './day-card/DayCard';
import { CardCarouselType } from '../../models/Carousel';
import { DayCard as DayCardModel } from '../../models/DayCard';

import './Home.css';
import '../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

const CardCarousel: CardCarouselType<CarouselProps> = Carousel as CardCarouselType<CarouselProps>;

/**
 * using https://github.com/leandrowd/react-responsive-carousel
 */

type HomeProps = {
    days: DayCardModel[]
};

class Home extends Component<HomeProps> {
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
                        this.props.days && this.props.days.map((day, i) =>
                            <DayCard
                                key={day.daycard_id}
                                date={day.meal_date}
                                mealList={[{ id: '1', name: day.meal_name }]}
                            />
                        )
                    }
                </CardCarousel>
            </div>
        );
    }
}

export default Home;