import gql from 'graphql-tag';

export const allDayCards = gql`
  query AllDayCards {
    getDayCards {
      idDayCard
      date
      mealTimeCode
      recipes {
        idRecipes
        recipeName
        url
      }
    }
  }
`;

export const dayCardsRange = gql`
  query DayCardsRange($startDate: Date, $endDate: Date) {
    getDayCards(startDate: $startDate, endDate: $endDate) {
      idDayCard
      date
      mealTimeCode
      recipes {
        idRecipes
        recipeName
        url
      }
    }
  }
`;

export const addDayCard = gql`
    mutation AddDayCard($newRecipe: RecipeInput!, $date: Date!) {
        addDayCard(newRecipe: $newRecipe, date: $date) {
          idDayCard
          date
          mealTimeCode
          recipes
        }
    }
`;

export const addRecipe = gql`
    mutation AddRecipeToCard($newRecipe: RecipeInput!, $idDayCard: Int!) {
        addRecipeToCard(newRecipe: $newRecipe, idDayCard: $idDayCard) {
          recipes {
            idRecipes
            recipeName
            url
          }
        }
    }
`;

export const removeRecipe = gql`
    mutation RemoveRecipeFromCard($idRecipe: Int!, $idDayCard: Int!) {
        removeRecipeFromCard(idRecipe: $idRecipe, idDayCard: $idDayCard)
    }
`;