const express = require('express');
const app = express();
const publicRoute = require('./src/routes/public/index')
const errorHandler = require('./src/middleware/errorHandler')
const bodyParser = require('body-parser')
const {Server} = require('socket.io')
const cors = require('cors')


const io = new Server({
  cors:true 
})

require('dotenv').config();

const mongoose = require('mongoose');

const mongoString = process.env.MONGO_URL;

mongoose.connect("mongodb+srv://akhancode:Tgu49S6knBIT2rZE@cluster0.d5nj05z.mongodb.net/communication_db?retryWrites=true&w=majority&appName=Cluster0");


const phoneToSocketMapping = new Map()
const socketToPhoneMapping = new Map()


//socket io 
io.on("connection",(socket)=>{
    socket.on('join-room',(data)=>{
      const {mobileNumber,room} = data
      let recieverId = mobileNumber
      let roomId = room
      console.log(`user ${recieverId} joined room ${roomId}`)
      phoneToSocketMapping.set(recieverId,socket.id)
      socketToPhoneMapping.set(socket.id,recieverId)
      socket.join(roomId)
      socket.emit('joined-room',{roomId})
      socket.broadcast.to(roomId).emit('user-joined',recieverId)
    })
    socket.on('call-user',(data)=>{
      const {recieverId,offer} = data
      console.log(`calling user ${recieverId} ${offer}`)
      const socketId = phoneToSocketMapping.get(recieverId)
     const recieverFrom =  socketToPhoneMapping.get(socket.id)
       socket.to(socketId).emit('incoming-call',{from:recieverFrom,offer})
    })
    socket.on('call-accepted',(data)=>{
      const {mobileNumber,ans} = data
      console.log(`call accepted ${mobileNumber} ${ans}`)
      const socketId = phoneToSocketMapping.get(mobileNumber)
      socket.to(socketId).emit('call-accepted',{ans})
      
    })
})

 





const database = mongoose.connection;
app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

database.on("error", (error) => {
  console.error(error);
});

database.once("connected", () => {
  console.log("Connected to MongoDB");
  
});


// Middleware to parse JSON bodies
const port = process.env.PORT;
app.use(express.json());


app.use((req, res, next) => {
  console.log(`%c${req.method} ${req.url}`,"color:green;");
  next();
});

app.use('/api', publicRoute);
// app.use('/admin/api', userRoutes);

app.use(errorHandler)
// Start the server
app.listen(port, () => {
  console.log(`%c Server is running at http://localhost:${port}`, 'color:green;');
});


io.listen(8001)