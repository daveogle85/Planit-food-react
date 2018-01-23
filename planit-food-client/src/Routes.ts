import { AppRoute } from './models/Router';
import HomeContainer from './components/home/HomeContainer';
import CalendarContainer from './components/calendar/CalendarContainer';
import RecipesContainer from './components/recipes/RecipesContainer';

export const routes: AppRoute[] = [
    {
        path: '/',
        exact: true,
        component: HomeContainer
    },
    {
        path: '/calendar',
        exact: true,
        component: CalendarContainer
    },
    {
        path: '/recipes',
        exact: true,
        component: RecipesContainer
    }
];