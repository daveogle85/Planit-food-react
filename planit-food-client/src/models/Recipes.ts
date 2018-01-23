import { ApiProps } from './Api';

export type Recipe = {
    idRecipes?: number,
    recipeName: string,
    url?: string
}

export type AddRecipeMutatorProps = {
    newRecipe: Recipe,
    date: string,
    idDayCard?: number
}

export type RemoveRecipeMutatorProps = {
    idRecipe: number,
    date: string
}

// export type recipeQueryVariables = { startDate: Moment, endDate: Moment };

// type RecipeApolloActions = {
//     addRecipeToCard: DayCard,
//     removeRecipeFromCard: boolean,
//     addDayCard: DayCard
// }

export type RecipesContainerProps = ApiProps<
    { getRecipes: Recipe[] },
    {}, {}>