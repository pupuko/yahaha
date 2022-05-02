const socket = require('socket.io')

module.exports.websocket = socket => {
  global.chatSocket = socket;

  socket.on("login", userId => {
    if (onlineUsers.has(userId)) {
      // 强制其他位置登录下线
      const prevSocket = onlineUsers.get(userId)
      socket.to(prevSocket).emit("force-logout", "该账号已在别处登录！")
    }
    // 登录
    onlineUsers.set(userId, socket.id)
    socket.emit("login", "登陆成功！")
  })

  socket.on("logout", userId => {
    console.log("logout")
    onlineUsers.delete(userId)
  })

  socket.on("send-message", data => {
    const toUserSocket = onlineUsers.get(data.to)
    if (toUserSocket) {
      socket.to(toUserSocket).emit("message-received", data.message)
    }
  })
}



