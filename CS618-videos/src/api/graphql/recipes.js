import { gql } from '@apollo/client/core/index.js'

export const RECIPE_FIELDS = gql`
  fragment RecipeFields on Recipe {
    author {
      username
    }
    id
    title
    ingredientList
    image
    tags
    updatedAt
    createdAt
  }
`

export const GET_RECIPES = gql`
  ${RECIPE_FIELDS}
  query getRecipes($options: RecipesOptions) {
    recipes(options: $options) {
      ...RecipeFields
    }
  }
`

export const GET_RECIPES_BY_AUTHOR = gql`
  ${RECIPE_FIELDS}
  query getRecipesByAuthor($author: String!, $options: RecipesOptions) {
    recipesByAuthor(username: $author, options: $options) {
      ...RecipeFields
    }
  }
`

export const CREATE_RECIPE = gql`
  mutation createRecipe ($title: String!, $ingredientList: [String!], $image: String!, $tags: [String!]) {
    createRecipe(title: $title, ingredientList: $ingredientList, image: $image, tags: $tags) {
      id
      title
    }
  }
`
