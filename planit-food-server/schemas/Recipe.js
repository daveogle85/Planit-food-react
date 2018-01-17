// Construct a recipe schema, using GraphQL schema language

const recipeSchema = `
  type Recipe {
    idRecipes: Int!
    recipeName: String!
    url: String
  }
`;

const recipeQuery = `
  Recipes(idRecipes: Int, nameContains: String): [Recipe]
`;

module.exports = { recipeSchema, recipeQuery };