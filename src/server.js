import express from 'express'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import messageRoutes from './routes/messages.js'
import expenseRoutes from './routes/expanses.js'
import groupRoutes from './routes/groups.js'
import connect from './config/db.js'
import dotenv from 'dotenv'
import cors  from 'cors';

dotenv.config()
connect()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes)
app.use('/expanses', userRoutes)
app.use('/api/v1', messageRoutes)
app.use('/api/v1', expenseRoutes)
app.use('/groups', groupRoutes)

app.get("/healthcheck", (req, res) => {
    res.json({ message: "Healthcheck working...." })
})

app.listen(3001, () => {
    console.log(`Server running on port 3001`);
})