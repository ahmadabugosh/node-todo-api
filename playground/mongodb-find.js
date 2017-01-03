//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {

	

	if(err)
	{
		return console.log('Unable to connect to Mongodb Server');
	}
	console.log('Connected to Mongodb server');

// 	db.collection('Todos').find({
// 		_id: new ObjectID('586ab7e41fbd3e31f62557ea')
// }).toArray().then((docs)=>{
// 		console.log('Todos');
// 		console.log(JSON.stringify(docs, undefined,2));

// 	}, (err) => {
// 		console.log('Unable to fetch documents',err);
// 	} );

	// db.collection('Todos').find().count().then((count)=>{
	// 	console.log(`Todos:${count}`);
	// 	console.log(JSON.stringify(count, undefined,2));

	// }, (err) => {
	// 	console.log('Unable to fetch documents',err);
	// } );

	db.collection('Users').find({name:"Ahmad Abugosh"}).toArray().then((docs)=>{
		console.log('Users named Ahmad');
		console.log(JSON.stringify(docs, undefined,2));

	}, (err) => {
		console.log('Unable to fetch documents',err);
	} );


	//db.close();

});


