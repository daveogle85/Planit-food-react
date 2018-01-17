import gql from 'graphql-tag';

export const allDayCards = gql`
  query AllDayCards {
    DayCards {
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
    DayCards(startDate: $startDate, endDate: $endDate) {
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