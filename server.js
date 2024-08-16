const express = require('express');
const app = express();
const publicRoute = require('./src/routes/public/index')
const errorHandler = require('./src/middleware/errorHandler')
const bodyParser = require('body-parser')
const {Server} = require('socket.io')
const cors = require('cors')


let io = new Server({
  cors:true 
})

require('dotenv').config();

const mongoose = require('mongoose');

const mongoString = process.env.MONGO_URL;

mongoose.connect("mongodb+srv://akhancode:Tgu49S6knBIT2rZE@cluster0.d5nj05z.mongodb.net/communication_db?retryWrites=true&w=majority&appName=Cluster0");


const phoneToSocketMapping = new Map()
const socketToPhoneMapping = new Map()
io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
      socket.broadcast.emit("callEnded")
  });
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });
  socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal)
  });
});
 




let server = require('http').createServer(app)
 io = io.listen(server);

server.listen(8000);

// const database = mongoose.connection;
// app.use(cors());
// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

// database.on("error", (error) => {
//   console.error(error);
// });

// database.once("connected", () => {
//   console.log("Connected to MongoDB");
  
// });


// // Middleware to parse JSON bodies
// const port = process.env.PORT;
// app.use(express.json());


// app.use((req, res, next) => {
//   console.log(`%c${req.method} ${req.url}`,"color:green;");
//   next();
// });

// app.use('/api', publicRoute);
// // app.use('/admin/api', userRoutes);

// app.use(errorHandler)
// Start the server
// app.listen(port, () => {
//   console.log(`%c Server is running at http://localhost:${port}`, 'color:green;');
// });


// io.listen(8001)