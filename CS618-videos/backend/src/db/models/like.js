import mongoose, { Schema } from 'mongoose'
const likesSchema = new Schema({
  recipeId: { type: String, required: true },
})
export const Like = mongoose.model('likes', likesSchema)
