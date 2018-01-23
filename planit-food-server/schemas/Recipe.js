// Construct a recipe schema, using GraphQL schema language

const recipeSchema = `
  type Recipe {
    idRecipes: Int!
    recipeName: String!
    url: String
    tags: [Tag]
  }

  type Tag {
    idTags: Int!
    tagName: String!
    tagColour: String
  }
`;

const recipeInput = `
  input RecipeInput {
    recipeName: String!
    url: String
  }
`;

const recipeQuery = `
  getRecipes(idRecipes: Int, nameContains: String): [Recipe]
`;

const recipeMutators = `
  createRecipe(newRecipe: RecipeInput!): [Recipe]
`;

module.exports = {
  recipeInput,
  recipeSchema,
  recipeQuery,
  recipeMutators
};