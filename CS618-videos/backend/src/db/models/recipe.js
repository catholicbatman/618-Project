import mongoose, { Schema } from 'mongoose'
const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    ingredientList: { type: Array, required: true },
    image: { type: String, required: true },
    tags: [String],
  },
  { timestamps: true },
)
export const Recipe = mongoose.model('recipe', recipeSchema)
