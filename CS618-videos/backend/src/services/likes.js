import { Like } from '../db/models/like.js'

export async function createLike(String) {
  const like = new Like(String)
  return await like.save()
}

export async function getTotalLikes(recipeId) {
  return {
    likes: await Like.countDocuments({ recipeId }),
  }
}
