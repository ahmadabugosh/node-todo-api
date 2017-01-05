//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {

	

	if(err)
	{
		return console.log('Unable to connect to Mongodb Server');
	}
	console.log('Connected to Mongodb server');

// 	db.collection('Todos').findOneAndUpdate({_id: new ObjectID('586d490703f01868a7a61373')},
// {
// $set:{
// 	completed:true
// }

// }, {
// 	returnOriginal: false
// }).then((result) => { 
// console.log(result);
// })

db.collection('Users').findOneAndUpdate({_id: new ObjectID('586bc3e66026c653e79b2502')},
{
$set:{
	name:'Ahmad'
}, 

$inc:
{
	age: 1
}, 

$unset: { completed: ""}

}, {
	returnOriginal: false
}).then((result) => { 
console.log(result);
})


	
	//db.close();

});


