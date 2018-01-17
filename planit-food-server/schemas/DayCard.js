// Construct a day card schema, using GraphQL schema language

const dayCardSchema = `
  type DayCard {
    idDayCard: Int!
    date: Date!
    mealTimeCode: String
    recipes: [Recipe]
  }
`;

const dayCardQuery = `
  DayCards(idDayCard: Int, startDate: Date, endDate: Date): [DayCard]
`;

module.exports = { dayCardSchema, dayCardQuery };