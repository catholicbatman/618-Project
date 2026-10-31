import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Header } from '../components/Header.jsx'
import { Recipe } from '../components/Recipe.jsx'
import { getRecipeById } from '../api/recipes.js'
import { useEffect, useState } from 'react'
import { recipeTrackEvent } from '../api/events.js'
import { Helmet } from 'react-helmet-async'
import { RecipeStats } from '../components/RecipeStats.jsx'

export function ViewRecipe({ recipeId }) {
  const [session, setSession] = useState()

  const trackEventMutation = useMutation({
    mutationFn: (action) => recipeTrackEvent({ recipeId, action, session }),
    onSuccess: (data) => setSession(data?.session),
  })

  useEffect(() => {
    let timeout = setTimeout(() => {
      trackEventMutation.mutate('startView')
      timeout = null
    }, 1000)
    return () => {
      if (timeout) clearTimeout(timeout)
      else trackEventMutation.mutate('endView')
    }
  }, [])

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
        <div>
          <Recipe {...recipe} fullRecipe />
          <hr /> <RecipeStats recipeId={recipeId} />
        </div>
      ) : (
        `Recipe with id${recipeId} not found.`
      )}
    </div>
  )
}
ViewRecipe.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
