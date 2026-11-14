import { useQuery } from '@tanstack/react-query'
import { getRecipeById } from '../api/recipes.js'

export function QueryLikesGraphQL({ recipeId }) {
  const recipeQuery = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(recipeId),
  })
  const recipe = recipeQuery.data
  const likes = recipe.likes

  return likes
}
