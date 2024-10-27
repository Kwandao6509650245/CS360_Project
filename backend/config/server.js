
const express = require('express');
const bodyParser = require('body-parser');
const petRoutes = require('../../routes/petRoutes');
const sequelize = require('../config/database');

const app = express();
app.use(bodyParser.json());

app.use('/api/pets', petRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database connected successfully');
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});


module.exports = app; 
