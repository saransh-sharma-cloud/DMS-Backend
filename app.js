require('dotenv').config();  

const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());

app.use(express.json()); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

// Import Routes
const userRoutes = require('./routes/userRoutes');

// Use Routes
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to Node MVC' });
});


// Connect to MongoDB using the URI from .env
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });


const port = process.env.PORT || 4000;  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
