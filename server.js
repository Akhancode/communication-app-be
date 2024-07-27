const express = require('express');
const app = express();
const publicRoute = require('./src/routes/public/index')
const errorHandler = require('./src/middleware/errorHandler')
require('dotenv').config();
// Middleware to parse JSON bodies
const port = process.env.PORT;
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', publicRoute);
// app.use('/admin/api', userRoutes);

app.use(errorHandler)
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
