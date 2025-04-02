const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRouter = require('./routes/authRoute');
const eventRouter = require('./routes/eventRoute');

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter);

module.exports = app;