
import express from 'express'
import auth from '../middleware/auth.js'

const router = express.Router()


import {
    login,
    register,
    verif,
    getUserStatus,
    updateProfile,
    sendSeviceRequest,
    updateService,
    getAllServices,
    getServiceById,
    sendDemande,
    getDemandesbyId,
    addComment,
    getAllComments,
    removeComment
} from '../controllers/globalController.js'

//LOGIN USER
router.post('/login', login)
//REGISTER USER
router.post('/register', register)
//CHECK AUTH
router.post('/check', auth, (req, res) => res.json(true))
//VERIFY EMAIL
router.post('/verify', auth, verif)
// GET USER DETAILS
router.get('/details', auth, getUserStatus)
//UPDATE PROFILE
router.post('/profile', auth, updateProfile)
// SEND SERVICE REQUEST
router.post('/service/request', auth, sendSeviceRequest)
//UPDATE SERVICE REQUEST
router.post('/service/update', auth, updateService)
//GET ALL SERVICES
router.get('/services', getAllServices)
//GET SERVICE BY ID
router.get('/service/:id',getServiceById)
//SEND DEMANDE
router.post('/service/send',auth,sendDemande)
//GET DEMANDE BY USER  ID
router.get('/demande',auth,getDemandesbyId)
//ADD COMMENT
router.post('/add',auth,addComment)
// GET ALL COMMNETS
router.get('/comments/:id',getAllComments)
// REMOVE COMMENT BY ID
router.post('/remove',auth,removeComment)


export default router