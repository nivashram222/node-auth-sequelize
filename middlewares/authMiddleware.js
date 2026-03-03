const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        console.log(decoded);
        req.user = decoded
        next()
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' })
    }
}
