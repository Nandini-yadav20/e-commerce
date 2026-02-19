import express from 'express'
import { login, signup, listUsers } from '../controllers/userController.js'
import adminAuth from '../middleware/adminAuth.js'

const userRouter = express.Router();

userRouter.post('/register', signup)
userRouter.post('/login', login)
userRouter.get('/list', adminAuth, listUsers)  // New: Admin can list all users

export default userRouter;
