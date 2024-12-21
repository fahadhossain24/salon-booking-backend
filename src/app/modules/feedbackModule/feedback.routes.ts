import express from 'express'
import feedbackControllers from './feedback.controllers'

const feedbackRouter = express.Router()

feedbackRouter.post('/create-or-update', feedbackControllers.createOrUpdateFeedback)

export default feedbackRouter