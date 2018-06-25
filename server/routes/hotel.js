import express from 'express'
import { required, hotelMiddleware } from '../middleware'
import { hotel } from '../db'
import { handleError } from '../utils'
import { User } from '../models'

const app = express.Router()

// GET /api/hotel
app.get('/', async (req, res) => {
  try {
    const { sort } = req.query
    const hotels = await hotel.findAll(sort)
    res.status(200).json(hotels)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/hotel/:id
app.get('/:id', hotelMiddleware, async (req, res) => {
  try {
    res.status(200).json(req.hotel)
  } catch (error) {
    handleError(error, res)
  }
})

// POST /api/hotel
app.post('/', required, async (req, res) => {
  const { id, name, stars, price, image } = req.body
  const q = {
    id,
    name,
    stars,
    price,
    image,
    user: req.user._id
  }

  try {
    const savedHotel = await hotel.create(q)
    res.status(201).json(savedHotel)
  } catch (error) {
    handleError(error, res)
  }
})

app.post('/:id/newHotels', required, hotelMiddleware, async (req, res) => {
  const a = req.body
  const q = req.hotel
  a.user = new User(req.user)
  try {
    const savedAnswer = await hotel.createAnswer(q, a)
    res.status(201).json(savedAnswer)
  } catch (error) {
    handleError(error, res)
  }
})

export default app
