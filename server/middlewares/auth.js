const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    // examine if there is a token
    try {

        const token = req.cookies.cookieStore
        console.log('AUTH: token is', token)

        if (!token) return res.status(400).send({success: false})

        const decodedToken = jwt.verify(token, process.env.SECRET)
        console.log('decodedTOken is', decodedToken)

        if (!decodedToken) return res.status(400).send({success: false})
        next()
        
    } catch (error) {
        
        console.log('AUTH error:', error.message)
        res.status(400).send(error.message)
    }
}