const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id= '5870f1c6b303e0fe259245ae';

if(!ObjectID.isValid(id)){
	console.log('ID not valid');
}

// Todo.find({
// _id:id

// }).then((todos) => {

// 	console.log('Todos', todos);
// });

// //find only one at most

// Todo.findOne({
// _id:id

// }).then((todo) => {

// 	console.log('Todo', todo);
// });

// //find just by id


User.findById(id).then((user) => {
	if(!user){
		return console.log('Id not found');
	}

	console.log('User by id', JSON.stringify(user, undefined,2));
}).catch((e) => console.log(e));