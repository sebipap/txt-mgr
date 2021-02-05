const router = require('express').Router()
const User = require('../models/User')
const verify = require('../scripts/verifyToken')



router.get('/info', verify, async (req, res) => {
    const user_id = req.user
    const user = await User.findById(user_id)
    res.send(user)
})

module.exports = router