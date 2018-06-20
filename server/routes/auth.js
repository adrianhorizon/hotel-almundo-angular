import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { secret } from '../config'
import { User } from '../models'
import {
  hashSync as hash,
  compareSync as comparePasswords
} from 'bcryptjs'

const app = express.Router()
const debug = new Debug('testfront:auth')

app.post('/signin', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    debug(`User with email ${email} not found`)
    return handleLoginFailed(res)
  }

  if (!comparePasswords(password, user.password)) {
    debug(`Passwords do not match: ${password} !== ${user.password}`)
    return handleLoginFailed(res, 'El correo y la contraseña no coinciden')
  }

  const token = createToken(user)
  res.status(200).json({
    message: 'Login succeded',
    token,
    userId: user._id,
    firstName: user.firstName,
    userName: user.userName,
    email: user.email
  })
})

const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 14400 })

app.post('/signup', async (req, res) => {
  const { userName, firstName, email, password } = req.body
  const u = new User({
    userName,
    firstName,
    email,
    password: hash(password, 10)
  })
  debug(`Creating new user: ${u}`)
  const user = await u.save()
  const token = createToken(user)
  res.status(201).json({
    message: 'User saved',
    token,
    userId: user._id,
    firstName,
    userName,
    email
  })
})

function handleLoginFailed(res, message) {
  return res.status(401).json({
    message: 'Login failed',
    error: message || 'Email and password don\'t match'
  })
}

export default app
