var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  scalar Date

  type DayCard {
    daycard_id: Int!
    meal_date: Date!
    meal_name: String!
  }

  type Query {
    dayCards(daycard_id: Int, startDate: Date, endDate: Date): [DayCard]
  }
`);

module.exports = {
  schema
};