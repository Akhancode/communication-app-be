const express = require('express');
const app = express();
const publicRoute = require('./src/routes/public/index')
const errorHandler = require('./src/middleware/errorHandler')
const chalk = require('chalk');
require('dotenv').config();

const mongoose = require('mongoose');
const syncIndexesInDatabase = require('./src/middleware/syncIndexesInDatabase');
const { createIndexes, syncIndexInMongo } = require('./src/utils/mongoHelper/mongoHelper');


const mongoString = process.env.MONGO_URL;

mongoose.connect(mongoString);

const database = mongoose.connection;



database.on("error", (error) => {
  console.error(error);
});

database.once("connected", () => {
  console.log("Connected to MongoDB");
  syncIndexInMongo()
});


// Middleware to parse JSON bodies
const port = process.env.PORT;
app.use(express.json());


app.use((req, res, next) => {
  console.log( `%c${req.method} ${req.url}`, "color:green;");
  next();
});




app.use('/api', publicRoute);
// app.use('/admin/api', userRoutes);

app.use(errorHandler)
// Start the server
app.listen(port, () => {
  console.log(`%c Server is running at http://localhost:${port}`, 'color:green;');
});
