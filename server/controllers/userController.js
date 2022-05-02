const UserModel = require('../models/userModel')
const bcrypt = require("bcrypt")

module.exports.register = async (req, res, next) => {
  console.log(req.body)
  try {
    const { username, password } = req.body
    const usernameCheck = await UserModel.findOne({ username })
    if (usernameCheck) return res.json({ status: 'fail', message: "Username already used." })

    const hashPassword = await bcrypt.hash(password, 10)
    const user = await UserModel.create({
      username,
      password: hashPassword
    })

    user.password = undefined
    console.log(user)
    return res.json({ status: 'success', message: "Register Success.", data: user })
  } catch (err) {
    next(err)
  }

}

module.exports.login = async (req, res, next) => {
  console.log(req.body)
  try {
    const { username, password } = req.body

    const user = await UserModel.findOne({ username })
    if (!user) {
      return res.json({ status: 'fail', message: "用户不存在！" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return res.json({ stauts: 'fail', message: "密码错误！" })

    delete user.password
    return res.json({ status: 'success', message: `Welcome, ${user.username}!`, data: user })
  } catch (err) {
    next(err)
  }
}

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.query.id;
    const { avatarImage } = req.body
    const userData = await UserModel.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    })
    return res.json({
      status: 'success',
      message: 'Avatar has been set.',
      data: {
        userData
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports.getContacts = async (req, res, next) => {
  try {
    const users = await UserModel.find({}).select(["username", "avatarImage", "_id"])
    return res.json({ status: 'success', data: users, messgae: "Get all users." })
  } catch (err) {
    next(err)
  }
}

module.exports.testAvatar = (req, res) => {
  res.send('avatar')
}