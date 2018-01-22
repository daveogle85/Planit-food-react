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

export const addRecipe = gql`
    mutation AddRecipeToCard($newRecipe: RecipeInput!, $date: Date!, $idDayCard: Int) {
        addRecipeToCard(newRecipe: $newRecipe, date: $date, idDayCard: $idDayCard) {
          recipes {
            idRecipes
            recipeName
            url
          }
        }
    }
`;

export const removeRecipe = gql`
    mutation RemoveRecipeFromCard($idRecipe: Int!, $date: Date!) {
        removeRecipeFromCard(idRecipe: $idRecipe, date: $date)
    }
`;