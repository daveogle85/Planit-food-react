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