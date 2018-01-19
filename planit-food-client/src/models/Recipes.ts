export type Recipe = {
    idRecipes?: number,
    recipeName: string,
    url?: string
}

export type AddRecipeMutatorProps = {
    newRecipe: Recipe,
    idDayCard: number
}

export type RemoveRecipeMutatorProps = {
    idRecipe: number,
    idDayCard: number
}