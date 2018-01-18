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