import Debug from 'debug'
import { Question, Answer } from '../models'

const debug = new Debug('testfront:db:question')

export default {
  findAll: (sort = '-createdAt') => {
    debug('Finding all questions')
    return Question.find().populate('answers').sort(sort)
  },

  findById: (_id) => {
    debug(`Find question with id ${_id}`)
    return Question
      .findOne({ _id })
      .populate('user')
      .populate({
        path: 'answers',
        options: { sort: '-createdAt' },
        populate: {
          path: 'user',
          model: 'User'
        }
      })
  },

  create: (q) => {
    debug(`Creating new question ${q}`)
    const question = new Question(q)
    return question.save()
  },

  createAnswer: async (q, a) => {
    const answer = new Answer(a)
    const savedAnswer = await answer.save()
    q.answers.push(savedAnswer)
    await q.save()
    return savedAnswer
  }
}
