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
  getDayCards(idDayCard: Int, startDate: Date, endDate: Date): [DayCard]
`;

const dayCardMutators = `
  addRecipeToCard(newRecipe: RecipeInput!, idDayCard: Int!): DayCard
  removeRecipeFromCard(idRecipe: Int!, idDayCard: Int!): Boolean
`;

module.exports = { dayCardSchema, dayCardQuery, dayCardMutators };