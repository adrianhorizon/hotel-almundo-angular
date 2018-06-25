import mongoose, { Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const HotelSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  stars: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
})

export default mongoose.model('Hotel', HotelSchema)
