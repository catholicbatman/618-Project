import { createUser, loginUser } from '../services/users.js'
import { createRecipe, updateLikes } from '../services/recipes.js'
import { GraphQLError } from 'graphql'
export const mutationSchema = `#graphql
    type Mutation {
        signupUser(username: String!, password: String!): User
        loginUser(username: String!, password: String!): String
        createRecipe(title: String!, ingredientList: [String!], image: String! tags:[String], likes: Int): Recipe
        newLike(postId: String!): Recipe
    }
`
export const mutationResolver = {
  Mutation: {
    signupUser: async (parent, { username, password }) => {
      return await createUser({ username, password })
    },
    loginUser: async (parent, { username, password }) => {
      return await loginUser({ username, password })
    },
    createRecipe: async (
      parent,
      { title, ingredientList, image, tags, likes },
      { auth },
    ) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          },
        )
      }
      return await createRecipe(auth.sub, {
        title,
        ingredientList,
        image,
        tags,
        likes,
      })
    },
    newLike: async (parent, { recipeId }) => {
      return await updateLikes({ recipeId })
    },
  },
}
