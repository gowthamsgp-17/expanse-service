import express from 'express'
import { expanseList, fetchExpanses, fetchExpensesByGroup, deleteRecords } from '../controllers/expanses.js'
import authenticate from '../middleware/auth.js'
const router = express.Router()

router.post('/save', authenticate, expanseList)
router.get('/query', authenticate, fetchExpanses)
router.get('/queryWithGroup', authenticate, fetchExpensesByGroup)
router.post('/deleteRecords', authenticate, deleteRecords)

export default router