var mongoose = require('mongoose');

//add promise

mongoose.Promise= global.Promise;

//connect to database locally or heroku
mongoose.connect(process.env.MONGODB_URI);

//exports mongoose

module.exports={mongoose};






