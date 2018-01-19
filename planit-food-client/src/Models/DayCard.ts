import { Moment } from "moment";
import { Recipe } from './Recipes';

export type DayCard = {
    idDayCard: number,
    date: Moment,
    mealTimeCode: string,
    recipes: Recipe[]
}

export type MealItem = Recipe & { isPlaceholder?: boolean };

export type AddDayCardMutatorProps = {
    newRecipe: Recipe,
    date: Moment
}