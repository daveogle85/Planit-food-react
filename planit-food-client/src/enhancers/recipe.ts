import { graphql } from 'react-apollo';
import { addRecipe, removeRecipe } from '../api/dayCard';
import { AddRecipeMutatorProps, RemoveRecipeMutatorProps } from '../models/Recipes';

export const addRecipeMutator = graphql(addRecipe, {
    props: ({ mutate }) => ({
        addRecipeToCardWithData: (recipe: AddRecipeMutatorProps) =>
            mutate && mutate({ variables: recipe })
    })
});

export const removeRecipeMutator = graphql(removeRecipe, {
    props: ({ mutate }) => ({
        removeRecipeFromCardWithData: (removeRecipeProps: RemoveRecipeMutatorProps) =>
            mutate && mutate({ variables: removeRecipeProps })
    })
});