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
export const GET_TOTAL_LIKES = gql`
  ${RECIPE_FIELDS}
  query getRecipeLikes($recipeId: ID) {
    likesById(id: $recipeId) {
      ...PostFields
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
  mutation createRecipe(
    $title: String!
    $ingredientList: [String!]
    $image: String!
    $tags: [String!]
    $likes: Int
  ) {
    createRecipe(
      title: $title
      ingredientList: $ingredientList
      image: $image
      tags: $tags
      likes: $likes
    ) {
      id
      title
    }
  }
`
export const UPDATE_LIKES = gql`
  mutation updateLikes($recipeId: ID) {
    updateLikes(recipeId: $recipeId) {
      id
    }
  }
`
