import { ApiProps } from './Api';
import { Tag } from './Tags';

export type Recipe = {
    idRecipes?: number,
    recipeName: string,
    url?: string
    tags?: Tag[]
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

type RecipeApolloActions = {
    fetchRecipeContains: Recipe[]
}

export type recipesQueryVariables = { nameContains: string };

export type RecipesContainerProps = ApiProps<
    { getRecipes: Recipe[] },
    recipesQueryVariables, RecipeApolloActions> & {
    fetchRecipeContainsWithData: (props: recipesQueryVariables) => {
            data: RecipeApolloActions
        }
    }