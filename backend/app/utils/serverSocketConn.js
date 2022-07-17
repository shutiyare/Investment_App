require("dotenv").config();

module.exports.serverSocket = function(){
const io = require("socket.io")(process.env.PORT, {
    cors: {
      origin: ["http://localhost:8080"]
    }
  })
  io.on("connection", socket => {
    console.log(socket.id);
  })
  return io
}