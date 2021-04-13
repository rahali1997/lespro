import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sendVerif from '../utils/sendVerif.js'
import sendD from '../utils/sendDemande.js'
import Demande from '../models/demandeModel.js'
import Comment from '../models/commentModel.js'



const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) { res.status(400).json({ message: 'Informations Invalid' }) }
        const isMatch = await bcrypt.compareSync(password, user.password)
        if (!isMatch) { res.status(401).json({ message: 'Informations Invalid' }) }
        const payload = {
            user: {
                id: user.id,
                role: user.role,
                fullName:user.fullName,
                isEmailVerified:user.isEmailVerified
            }
        }
        jwt.sign(payload, 'key', { expiresIn: '1h' }, (err, token) => {
            if (err) { throw err }
            else { res.status(200).json({ token }) }
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}


const register = async (req, res) => {
    

    const { fullName, email, role, password } = req.body;
    if(fullName =="" || email=="" || password=="") {
        res.send('somthing went wrong !')
    } else {
         
        try {
            let user = await User.findOne({ email: email })
            if (user) { return res.status(400).json({ message: 'Email exist déja' }) }
            let verifCode = String(Math.floor(Math.random(10) * 100000));
            const NewUser = new User({
                fullName:fullName,
                email: email,
                password: password,
                role: role,
                verifCode
            })
            const salt = await bcrypt.genSalt(5)
            NewUser.password = await bcrypt.hash(password, salt)
            await NewUser.save()
            const payload = {
                user: {
                    id: NewUser.id,
                    role: NewUser.role,
                    verifCode: NewUser.verifCode,
                    fullName,
                   
                }
            }
            jwt.sign(payload, 'key', { expiresIn: '1h' }, (err, token) => {
                if (err) { throw err }
                else { res.status(200).json({ token }) }
            })
    
            try {
              sendVerif(email, verifCode)
            } catch (error) {
                console.log(error.message)
            }
    
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: error.message })
        }
    }


}

const verif = async (req, res) => {
    const verifNumber = req.body.verifcode
    const user = await User.findById(req.user.id)
    if (user.verifCode === verifNumber) {

        try {
            user.isEmailVerified = true
            await user.save()
            res.status(200).json({ message: "Email verifié" })

        } catch (error) {

            console.log(err.message)
            res.status(500).json({ message: error.message })
        }

    } else if (user.verifCode !== verifNumber) {
        res.status(400).json({ message: 'erreur' })
    }
}

const getUserStatus = async (req, res) => {
    try {
        let user = await User.findById(req.user.id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'erreur' })
    }


}



const sendSeviceRequest = async (req, res) => {
    try {
        const { phone, spec, region, fiscale, description } = req.body;
        let user = await User.findById(req.user.id)
        user.phone = phone
        user.spec = spec
        user.region = region
        user.fiscale = fiscale
        user.description = description
        user.isRequestSubmitted = true
        await user.save()
        res.status(200).json({ message: "" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'erreur' })
    }
}

const updateService = async (req, res) => {
    try {
        const { phone, description } = req.body
        console.log(req.body)
        let user = await User.findById(req.user.id)
        user.phone = phone;
        user.description = description
        await user.save()
        res.status(200).json({ message: "" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'erreur' })
    }
}

const updateProfile = async (req, res) => {
    try {
        let user = await User.findById(req.user.id)
        user.phone = req.body.phone
        await user.save()
        res.status(200).json({ message: req.body.phone })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'erreur' })
    }
}


const getAllServices = async (req, res) => {
    try {
        let services = await User.find({ isVerified: true }).select('fullName region spec description')
        res.status(200).json(services)

    } catch (error) {
        console.log(error)
    }
}

const getServiceById = async (req, res) => {
    try {
        let service = await User.findById(req.params.id).select('fullName region spec description email')
        res.status(200).json(service)

    } catch (err) {
        console.log(error)
        res.status(500).json({ message: 'erreur' })
    }
}

const sendDemande = async (req, res) => {
    try {
        console.log(req.body)
        const { phone, description, email, fullname, spec } = req.body
        const NewDemande = new Demande({
            userId: req.user.id,
            fullName: fullname,
            spec: spec
        })

        try {
            await NewDemande.save()
            sendD(email, fullname, phone, description)
            res.status(200).json({ message: "" })
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: 'erreur' })
        }
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'erreur' })
    }
}
const getDemandesbyId = async (req, res) => {
    try {
       
        let demandes = await Demande.find({ userId: req.user.id })
        res.status(200).json(demandes)
    }
    catch (err) {

        console.log(err.message)
        res.status(500).json({ message: 'erreur' })
    }
}

const addComment = async (req, res) => {
    try {
        const { comment,serviceId } = req.body
        const NewComment = new Comment({
            userId: req.user.id,
            comment:comment,
            serviceId: serviceId
        })
        try {
            await NewComment.save()
            res.status(200).json({ message: "" })
        } catch (err) {
            console.log(err)
        }

    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'erreur' })
    }
}

const getAllComments = async (req, res) => {
    try {
        let comments = await Comment.find({serviceId:req.params.id})
        res.status(200).json(comments)
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'erreur' })
    }
}

const removeComment=async(req,res)=>{
      const {commentID}=req.body
    try {
        let result=await Comment.findByIdAndDelete(commentID)
        res.status(200).json({ message: "" })

    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'erreur' })
    }
}
export {
    register,
    login, verif,
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
}