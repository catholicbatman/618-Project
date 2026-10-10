import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { createRecipe } from '../api/recipes'
import { useAuth } from '../contexts/AuthContext.jsx'

export function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [ingredientList, setIngredientList] = useState('')
  const [image, setImage] = useState('')
  const [token] = useAuth()

  const queryClient = useQueryClient()

  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe(token, { title, ingredientList, image }),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createRecipeMutation.mutate()
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
      <br />
      <br />
      <input
        type='submit'
        value={createRecipeMutation.isPending ? 'Adding...' : 'Add'}
        disabled={!title || createRecipeMutation.isPending}
      />
      {createRecipeMutation.isSuccess ? (
        <>
          <br />
          Recipe added successfully!
        </>
      ) : null}
    </form>
  )
}
