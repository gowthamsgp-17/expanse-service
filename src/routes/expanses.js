import express from 'express'
import { expanseList, fetchExpanses } from '../controllers/expanses.js'

const router = express.Router()

router.post('/save', expanseList)
router.get('/query', fetchExpanses)

export default router