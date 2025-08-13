const express = require('express')
const {
    getProfile,
    createProfile,
    updateProfile,
} = require('../controllers/profileController')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getProfile)
router.post('/', authMiddleware, createProfile)
router.put('/', authMiddleware, updateProfile)

module.exports = router
