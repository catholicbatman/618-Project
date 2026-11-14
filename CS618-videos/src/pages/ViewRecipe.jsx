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
import { getUserInfo } from '../api/users.js'
//import { updateLikes } from '../../backend/src/services/recipes.js'
//import { UDPATE_LIKES } from '../api/graphql/recipes.js'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
//import { useQuery as useGraphQLQuery } from '@apollo/client/react/index.js'
import { UPDATE_LIKES } from '../api/graphql/recipes.js'
//import { GET_TOTAL_LIKES } from '../api/graphql/recipes.js'
//import { trackLike } from '../api/likes.js'

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

  /*const createLikeMutation = useMutation({
    mutationFn: () => trackLike({ recipeId }),
  })*/

  const recipeQuery = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(recipeId),
  })
  const recipe = recipeQuery.data

  const userInfoQuery = useQuery({
    queryKey: ['users', recipe?.author],
    queryFn: () => getUserInfo(recipe?.author),
    enabled: Boolean(recipe?.author),
  })
  const userInfo = userInfoQuery.data ?? {}

  //const [token] = useAuth()

  /*const [getTotalLikes] = useGraphQLMutation(GET_TOTAL_LIKES, {
    variables: { recipeId },
    //context: { headers: { Authorization: `Bearer ${token}` } },
    //onError: () => alert(console.error.message),
  })*/

  const [updateLikes, { loading, data }] = useGraphQLMutation(UPDATE_LIKES, {
    variables: { recipeId },
    //context: { headers: { Authorization: `Bearer ${token}` } },
    //onError: () => alert(console.error.message),
  })

  /*const queryClient = useQueryClient()

  const giveLikeMutation = useMutation({
    mutationFn: (recipeId) => UPDATE_LIKES(recipeId),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })*/

  const handleSubmit = (e) => {
    e.preventDefault()
    updateLikes()
    //createLikeMutation.mutate()
  }

  return (
    <div style={{ padding: 8 }}>
      {recipe && (
        <Helmet>
          <title>{recipe.title} | Full-Stack Recipe Hub</title>
          <meta property='og:article:author' content={userInfo.username} />
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
          <Recipe {...recipe} fullRecipe id={recipeId} author={userInfo} />
          Likes of this recipe: {recipe.likes}
          <form onSubmit={handleSubmit}>
            <br />
            <input
              type='submit'
              value={
                loading ? 'Liking...' : 'Like this post'
              }
            />
            {data?.updateLikes ? (
              <>
                <br />
                You liked this post!!
              </>
            ) : null}
          </form>
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
