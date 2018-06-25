import Debug from 'debug'
import { Hotel } from '../models'

const debug = new Debug('hotels:db-api:hotel')

export default {
  findAll: (sort = '-id') => {
    debug('Finding all Hotels')
    return Hotel.find().populate('hotel').sort(sort)
  },

  findById: (_id) => {
    debug(`Find question with id ${_id}`)
    return Question
      .findOne({ _id })
  },

  create: (q) => {
    debug(`Creating new hotel ${q}`)
    const hotel = new Hotels(q)
    return hotel.save()
  },
}
