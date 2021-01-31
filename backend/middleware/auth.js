
import jwt from 'jsonwebtoken'

export default function (req, res, next) {
    let token = req.header("header-token")
    if (!token) {
        return res.json(false)
    }
    try {
        const decoded = jwt.verify(token, 'key')
        req.user = decoded.user
        next()
    } catch (error) {
        res.json(false)
    }
}