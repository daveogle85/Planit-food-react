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
  getDayCards(date: Date, startDate: Date, endDate: Date): [DayCard]
`;

const dayCardMutators = `
  addRecipeToCard(newRecipe: RecipeInput!, date: Date!, idDayCard: Int): DayCard
  removeRecipeFromCard(idRecipe: Int!, date: Date!): Boolean
`;

module.exports = { dayCardSchema, dayCardQuery, dayCardMutators };