import http from 'http'
import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { mongoUrl, port } from './config'

const debug = new Debug('hotels:root')

mongoose.Promise = global.Promise

async function start() {
  await mongoose.connect(mongoUrl)

  app.listen(port, () => {
    debug(`Server running at port ${port}`)
  })
}

start()
