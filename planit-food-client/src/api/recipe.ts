import gql from 'graphql-tag';

export const newRecipe = gql`
    mutation NewRecipe($newRecipe: RecipeInput!) {
        createRecipe(newRecipe: $newRecipe) {
            idRecipes
            recipeName
            url
        }
    }
`;

export const allRecipes = gql`
    query AllRecipes {
        getRecipes {
            idRecipes
            recipeName
            url
        }
    }
`;