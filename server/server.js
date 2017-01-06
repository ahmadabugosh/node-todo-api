var mongoose = require('mongoose');

//add promise

mongoose.Promise= global.Promise;

//connect to database
mongoose.connect('mongodb://localhost:27017/TodoApp');

//create model
var Todo= mongoose.model('Todo', {

	text : {
		type: String

	}, 
	completed: 
	{
		type: Boolean

	}, 
	completedAt:
	{
		type: Number

	}


});

var newTodo = new Todo (
{
	text: 'Cook dinner'
});

var otherTodo = new Todo (
{
	text: 'exercise',
	completed: true,
	completedAt: 123
});

newTodo.save().then((doc)=> {
console.log('Saved todo',doc);
}, (e) => {
	console.log('Unable to save todo');
});

otherTodo.save().then((doc)=> {
console.log('Saved todo',JSON.stringify(doc,undefined,2));
}, (e) => {
	console.log('Unable to save todo');
});



