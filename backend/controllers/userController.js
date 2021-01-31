import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const login = async (req, res) => {
    
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) { res.status(400).json({ message: 'User Details' }) }
        const isMatch = await bcrypt.compareSync(password, user.password)
        if (!isMatch) { res.status(400).json({ message: 'Wrong Details' }) }
        const payload = {
            user: {
                id: user.id,
            }
        }
        jwt.sign(payload, 'key', { expiresIn: '1h' }, (err, token) => {
            if (err) { throw err }
            else { res.status(200).json({ token }) }
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message  })
    }
}


const register = async (req, res) => {

  
    const { username, email,password } = req.body;
    try {
        let user = await User.findOne({ email: email })
        if (user) { return res.status(400).json({ message: 'Email Already Exist' }) }
        const NewUser = new User({
            username,
            email,
            password,
            
        })

        const salt = await bcrypt.genSalt(5)
        NewUser.password = await bcrypt.hash(password, salt)
        await NewUser.save()
        const payload = {
            user: {
                id: NewUser.id,
            }
        }
        jwt.sign(payload, 'key', { expiresIn: '1h' }, (err, token) => {
            if (err) { throw err }
            else { res.status(200).json({ token }) }
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: error.message  })
    }

}

export { register, login }