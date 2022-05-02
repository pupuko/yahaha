const { register, login, setAvatar, testAvatar, getContacts } = require("../controllers/userController")

const router = require("express").Router()

router.post('/register', register)
router.post('/login', login)
router.post('/avatar', setAvatar)
router.get('/contacts', getContacts)

router.get('/avatar', testAvatar)

module.exports = router