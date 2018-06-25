import { hotel } from '../db'
import { handleError } from '../utils'

export const hotelMiddleware = async (req, res, next) => {
  try {
    req.hotel = await hotel.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
