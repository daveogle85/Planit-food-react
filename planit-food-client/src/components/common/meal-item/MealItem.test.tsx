import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MealItem from './MealItem';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MealItem
            allowEditing={false}
            id={1}
            mealID={1}
            value=""
            onEditSubmit={(v: string) => null}
            onDelete={(id) => null}
        />
        , div);
});