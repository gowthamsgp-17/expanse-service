import express from 'express'
import { register, login, getUsersList } from '../controllers/auth.js'

const router = express.Router()

router.post('/register', register)
router.get('/users', getUsersList)
router.post('/login', login)

export default router