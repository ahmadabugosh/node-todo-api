//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {

	

	if(err)
	{
		return console.log('Unable to connect to Mongodb Server');
	}
	console.log('Connected to Mongodb server');

	// db.collection('Todos').insertOne({
	// 	text: 'Some todo text',
	// 	completed: false

	//  }, (err,res) => {

	// 	if(err)
	// 	{
	// 		return console.log('Unable to insert todo');
	// 	}

	// 	console.log(JSON.stringify(res.ops,undefined,2));

	// });


	// db.collection('Users').insertOne({
	// 	name: 'Ahmad Abugosh',
	// 	age: 28,
	// 	location: 'Dubai'

	//  }, (err,res) => {

	// 	if(err)
	// 	{
	// 		return console.log('Unable to insert user', err);
	// 	}

	// 	console.log(JSON.stringify(res.ops[0]._id.getTimestamp(),undefined,2));

	// });
	db.close();

});


