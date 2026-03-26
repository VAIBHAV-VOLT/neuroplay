const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');

app.use('/auth', authRoutes);
app.use('/game', gameRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});