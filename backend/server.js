// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userroutes');

const app = express();

// 1. Middleware
app.use(cors());                  // <--- Allows requests from Ionic (localhost:8100)
app.use(bodyParser.json());       // <--- Parses JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// 2. Routes
app.use('/api/users', userRoutes);

// (Optional) A test route to verify server is working
app.get('/', (req, res) => {
  res.send('Node.js server is up and running!');
});

// 3. Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

