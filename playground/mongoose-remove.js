const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


//removes all
// Todo.remove({}).then((result)=> {
// 	console.log(result);

// });

//removes and returns one
// Todo.findByIdAndRemove(_id:'587bac4d653bbf8644063508').then((todo)=> {
// 	console.log(todo);

// });



//find by id and remove

Todo.findByIdAndRemove('587bac4d653bbf8644063508').then((todo)=> {
	console.log(todo);

});


