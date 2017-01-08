var mongoose = require('mongoose');

//add promise

mongoose.Promise= global.Promise;

//connect to database
mongoose.connect('mongodb://localhost:27017/TodoApp');

//exports mongoose

module.exports={mongoose};

