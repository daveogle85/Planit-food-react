import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DayCard from './DayCard';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DayCard id={1} mealList={[]} />, div);
});