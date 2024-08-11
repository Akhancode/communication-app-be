const express = require('express');
const app = express();
const publicRoute = require('./src/routes/public/index')
const errorHandler = require('./src/middleware/errorHandler')
const bodyParser = require('body-parser')

const cors = require('cors')

require('dotenv').config();

const mongoose = require('mongoose');

const mongoString = process.env.MONGO_URL;

mongoose.connect("mongodb+srv://akhancode:Tgu49S6knBIT2rZE@cluster0.d5nj05z.mongodb.net/communication_db?retryWrites=true&w=majority&appName=Cluster0");

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
