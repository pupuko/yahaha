const { addMessage, getAllMessage } = require("../controllers/messageController")

const router = require("express").Router()

router.post('/add', addMessage)
router.post('/getAll', getAllMessage)

module.exports = router