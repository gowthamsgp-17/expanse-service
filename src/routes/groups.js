import express from 'express'
import authenticate from '../middleware/auth.js'
import { saveGroup, queryGroup, updateGroup } from '../controllers/groups.js'

const router = express.Router()

router.get('/query', queryGroup)
router.post('/save', authenticate, saveGroup)
router.put('/:id/add-member', authenticate, updateGroup)

export default router