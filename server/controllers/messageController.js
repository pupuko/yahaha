const MessageModel = require('../models/messageModel')

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body
    const data = await MessageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from
    })

    if (data) return res.json({ status: 'success', message: 'Message added success.', data })
    return res.json({ status: 'fail', message: "Fail to add message." })

  } catch (err) {
    next(err)
  }
}

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body
    const messages = await MessageModel.find({
      users: {
        $all: [from, to],
      }
    }).sort({ updateAt: 1 })
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text
      }
    })
    res.json({
      status: 'success',
      message: "Get all messages.",
      data: projectMessages
    })
  } catch (err) {
    next(err)
  }
}