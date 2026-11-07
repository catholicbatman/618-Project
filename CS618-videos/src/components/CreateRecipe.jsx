/*import { useQueryClient, useMutation } from '@tanstack/react-query'*/
import { useState } from 'react'
/*import { createRecipe } from '../api/recipes'*/
import { useAuth } from '../contexts/AuthContext.jsx'
import { Link } from 'react-router-dom'

import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import {
  CREATE_RECIPE,
  GET_RECIPES,
  GET_RECIPES_BY_AUTHOR,
} from '../api/graphql/recipes.js'

export function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [likes] = useState(0)
  const [ingredientList, setIngredientList] = useState('')
  const [image, setImage] = useState('')
  const [token] = useAuth()

  /*const queryClient = useQueryClient()*/

  const [createRecipe, { loading, data }] = useGraphQLMutation(CREATE_RECIPE, {
    variables: { title, ingredientList, image, likes },
    context: { headers: { Authorization: `Bearer ${token}` } },
    refetchQueries: [GET_RECIPES, GET_RECIPES_BY_AUTHOR],
  })

  /*const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe(token, { title, ingredientList, image }),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })*/

  const handleSubmit = (e) => {
    e.preventDefault()
    createRecipe()
  }

  if (!token) return <div>Please log in to add a new recipe.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'> Recipe name: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <div> Ingredients separated by commas: </div>
      <br />
      <textarea
        value={ingredientList}
        onChange={(e) => setIngredientList(e.target.value)}
      />
      <br />
      <br />
      <div> Enter URL image of recipe: </div>
      <input value={image} onChange={(e) => setImage(e.target.value)} />
      {data?.createRecipe ? (
        <>
          <br />
          Recipe {''}
          <Link to={`/recipes/${data.createRecipe.id}`}>
            {data.createRecipe.title}
          </Link>{' '}
          created Successfully!
        </>
      ) : null}
      <br />
      <br />
      <input
        type='submit'
        value={loading ? 'Adding...' : 'Add'}
        disabled={!title || loading}
      />
      {data?.createRecipe ? (
        <>
          <br />
          Recipe added successfully!
        </>
      ) : null}
    </form>
  )
}
