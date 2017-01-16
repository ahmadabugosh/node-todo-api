const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');


const todos = [{
	_id : new ObjectID(),
	text:'First test todo'
}, 
{
	_id: new ObjectID(),
	text:'Second test todo'
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
return Todo.insertMany(todos);

	}).then(()=> done());

});

describe('POST /todos', () => {
 it('should create a new todo', (done) => 
	{
		var text= 'Test todo test';
		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((res)=> {
				expect(res.body.text).toBe(text);
			})
			.end((err,res)=> {
				if(err)
				{
					
					return done(err);
				}

				Todo.find({text}).then((todos)=> {

					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();

				}).catch((e)=> done(e));

			});

	 	});

 it('should not create a new todo with invalid body', (done) => 

 {
	request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err,res)=> {
				if(err)
				{
					
					return done(err);
				}

				Todo.find().then((todos)=> {

					expect(todos.length).toBe(2);
					done();

				}).catch((e)=> done(e));

			});


 });


});


describe('GET /todos', () => {
 it('should get all todos', (done) => 
	{
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res)=> {
			expect(res.body.todos.length).toBe(2);
		})
 .end(done);

	});

});


describe('GET /todos', () => {
 it('it should return todo', (done) => 
	{
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res)=> {
			expect(res.body.todo.text).toBe(todos[0].text);
		})
 .end(done);

	});

  it('it should return 404 if not found', (done) => 
	{
		var hex= new ObjectID().toHexString();
		request(app)
		.get(`/todos/${hex}`)
		.expect(404)
 .end(done);

	});


    it('it should return 404 if not valid object id', (done) => 
	{
		request(app)
		.get(`/todos/123`)
		.expect(404)
 .end(done);

	});

});




describe('DELETE /todos/:id', () => {
 it('should remove a todo', (done) => 
	{

		var hexID= todos[1]._id.toHexString();
		request(app)
		.delete(`/todos/${hexID}`)
		.expect(200)
		.expect((res)=> {
			expect(res.body.todo._id).toBe(hexID);
		})
 .end((err,res) => {
 	if (err)
 	{
 		return done(err);
 	}


				Todo.findById(hexID).then((todos)=> {

					expect(todos).toNotExist(0);
					done();


				}).catch((e)=> done(e));
 

 });

	});

  it('should return 404 if todo is not found', (done) => 
	{
		var hex= new ObjectID().toHexString();
		request(app)
		.delete(`/todos/${hex}`)
		.expect(404)
 .end(done);
		

	});

   it('should return 404 if object is not valid', (done) => 
	{
		request(app)
		.delete(`/todos/123`)
		.expect(404)
 .end(done);

	});

});