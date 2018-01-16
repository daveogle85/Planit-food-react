
// Construct a schema, using GraphQL schema language
var dayCardSchema = `
  scalar Date

  type DayCard {
    daycard_id: Int!
    meal_date: Date!
    meal_name: String!
  }

  type Query {
    DayCards(daycard_id: Int, startDate: Date, endDate: Date): [DayCard]
  }
`;

module.exports = {
  dayCardSchema
};