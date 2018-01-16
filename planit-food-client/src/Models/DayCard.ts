import { Moment } from "moment";

export type DayCard = {
    daycard_id: number,
    meal_date: Moment,
    meal_name: string
}

export type Meal = {
    id: string,
    name: string,
    isPlaceholder?: boolean
}