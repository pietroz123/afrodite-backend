const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const uri = process.env.MONGODB_URI;
const db = mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });

const app = express();

// CORS
app.use(cors());

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    express.json()
);
app.use(bodyParser.json());

// Routes
app.use('/api/servicos', require('./routes/api/servicos'));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port}`));
