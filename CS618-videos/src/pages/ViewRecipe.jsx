import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query'
import { Header } from '../components/Header.jsx'
import { Recipe } from '../components/Recipe.jsx'
import { getRecipeById } from '../api/recipes.js'
import { Helmet } from 'react-helmet-async'

export function ViewRecipe({ recipeId }) {
  const recipeQuery = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(recipeId),
  })
  const recipe = recipeQuery.data
  return (
    <div style={{ padding: 8 }}>
      {recipe && (
        <Helmet>
          <title>{recipe.title} | Full-Stack Recipe Hub</title>
        </Helmet>
      )}
      <Header />
      <br />
      <hr />
      <Link to='/'>Back to main page</Link>
      <br />
      <hr />
      {recipe ? (
        <Recipe {...recipe} fullRecipe />
      ) : (
        `Recipe with id${recipeId} not found.`
      )}
    </div>
  )
}
ViewRecipe.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
