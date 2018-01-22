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