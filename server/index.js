const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks'); // Import task routes

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes); // Use task routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
