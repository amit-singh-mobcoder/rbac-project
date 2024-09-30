import express from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import roleRoutes from './role.routes'

const router = express.Router()
router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use(roleRoutes)

export default router;