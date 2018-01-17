import gql from 'graphql-tag';

export const allDayCards = gql`
  query AllDayCards {
    DayCards {
        daycard_id 
        meal_name
        meal_date
    }
  }
`;

export const dayCardsRange = gql`
  query DayCardsRange($startDate: Date, $endDate: Date) {
    DayCards(startDate: $startDate, endDate: $endDate) {
        daycard_id 
        meal_name
        meal_date
    }
  }
`;