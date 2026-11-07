import { updateLikes, getTotalLikes} from '../services/recipes.js'
import { getRecipeById } from '../services/recipes.js'

export function likeRoutes(app) {
  app.post('/api/v1/likes', async (req, res) => {
    try {
      const { recipeId } = req.body
      const recipe = await getRecipeById(recipeId)
      if (recipe === null) return res.status(400).end()
      updateLikes({ recipeId})
      return res.json()
    } catch (err) {
      console.error('error tracking like', err)
      return res.status(500).end()
    }
  })

  app.get('/api/v1/likes/totalLikes/:recipeId', async (req, res) => {
    try {
      const { recipeId } = req.params
      const recipe = await getRecipeById(recipeId)
      if (recipe === null) return res.status(400).end()
      const stats = await getTotalLikes(recipe._id)
      return res.json(stats)
    } catch (err) {
      console.error('error getting likes for recipe', err)
      return res.status(500).end()
    }
  })
}

