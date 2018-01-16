import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DayCard from './DayCard';
import * as moment from 'moment';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DayCard date={moment('01-01-2001')} mealList={[]} />, div);
});