var express= require('express');
var bodyParser= require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app= express();

//configures middleware
app.use(bodyParser.json());



app.post('/todos', (req,res)=> {
	var todo= new Todo({
		text:req.body.text
	});

	todo.save().then((doc)=> {
		res.send(doc);

	}, (e) => {

		res.status(400).send(e);

	});

});

app.listen(3000, () => {
console.log('Started on port 3000');
});

module.exports= {app};





//create user model


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


// var user = new User (
// {
// 	email: 'ahmadabugosh@gmail.com',
// });

// user.save().then((doc)=> {
// console.log('User saved',JSON.stringify(doc,undefined,2));
// }, (e) => {
// 	console.log('Unable to save user',e);
// });


