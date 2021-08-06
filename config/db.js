const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
})

mongoose.connection.on('error', (error) => {
    console.log(error);
})

require('../models/users/Users.Models');
require('../models/events/Events.Models');