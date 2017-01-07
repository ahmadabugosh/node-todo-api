var mongoose = require('mongoose');

//add promise

mongoose.Promise= global.Promise;

//connect to database
mongoose.connect('mongodb://localhost:27017/TodoApp');

//create model
var Todo= mongoose.model('Todo', {

	text : {
		type: String,
		required: true,
		minlength: 1,
		trim: true

	}, 
	completed: 
	{
		type: Boolean,
		default: false

	}, 
	completedAt:
	{
		type: Number,
		default: null

	}


});


//create user model
var User= mongoose.model('User', {

	email : {
		type: String,
		required: true,
		minlength: 1,
		trim: true

	}


});

// var newTodo = new Todo (
// {
// });


// newTodo.save().then((doc)=> {
// console.log('Saved todo',doc);
// }, (e) => {
// 	console.log('Unable to save todo');
// });

// var otherTodo = new Todo (
// {
// 	text: 'This is a test',
// });

// otherTodo.save().then((doc)=> {
// console.log('Saved todo',JSON.stringify(doc,undefined,2));
// }, (e) => {
// 	console.log('Unable to save todo');
// });


var user = new User (
{
	email: 'ahmadabugosh@gmail.com',
});

user.save().then((doc)=> {
console.log('User saved',JSON.stringify(doc,undefined,2));
}, (e) => {
	console.log('Unable to save user',e);
});


