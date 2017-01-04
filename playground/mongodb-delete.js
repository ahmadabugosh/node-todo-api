//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {

	

	if(err)
	{
		return console.log('Unable to connect to Mongodb Server');
	}
	console.log('Connected to Mongodb server');



	//delete many

	// db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=> {
	// 	console.log(result);
	// });

	//delete one

	// db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=> {
	// 	console.log(result);
	// });

	//find one and delete, keeps document in case you want to re-add it
// db.collection('Todos').findOneAndDelete({completed:false}).then((result)=> {
// 		console.log(result);
// 	});

//exercise 1


	// db.collection('Users').deleteMany({name: 'Ahmad Abugosh'}).then((result)=> {
	// 	console.log(result);
	// });

	db.collection('Users').findOneAndDelete({_id: new ObjectID('586bc402592eb753ec0a9be1')}).then((result)=> {
		console.log(result);
	});

	//db.close();

});


