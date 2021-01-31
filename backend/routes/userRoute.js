import express from 'express'
import auth from '../middleware/auth.js'
const router = express.Router()


import {
    login,
    register,
} from '../controllers/userController.js'

//LOGIN USER
router.post('/login',login)
//REGISTER USER
router.post('/register',register)
//Check ROUTE
router.post('/check',auth,(req,res)=>res.json(true))



export default router