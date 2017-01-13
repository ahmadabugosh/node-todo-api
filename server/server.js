const {ObjectID} = require('mongodb');
var express= require('express');
var bodyParser= require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app= express();

//environment variable for deployment
const port =process.env.PORT || 3000;


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

app.get('/todos', (req,res) => {
Todo.find().then((todos) => {
res.send({todos});
}, (e) => {
res.status(400).send(e);
});

});

app.get('/todos/:id', (req,res) => {
	var id= req.params.id;

	if(!ObjectID.isValid(id)){
	return res.status(404).send();
}
	

Todo.findById(id).then((todo) => {
	if(!todo){
		return res.status(404).send();
	}

	return res.send({todo});
}).catch((e) => {
	res.status(404).send();
});

});

app.listen(port, () => {
console.log(`Started on port ${port}`);
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


