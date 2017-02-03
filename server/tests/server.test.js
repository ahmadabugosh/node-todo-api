const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos,users,populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

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



describe('PATCH /todos/:id', () => {
 it('should update the todo', (done) => 
	{
		var hex= todos[0]._id.toHexString();
		var text= 'This should be the new text';

		request(app)
		.patch(`/todos/${hex}`)
		.send({
			completed: true,
			text

		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(true);
			expect(res.body.todo.completedAt).toBeA('number');

		})

 .end(done);

		
 });

 it('should clear completedAt when todo is not completed', (done) => 
	{

		var hex= todos[1]._id.toHexString();
		var text= 'This should be the new text';

		request(app)
		.patch(`/todos/${hex}`)
		.send({
			completed: false,
			text

		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(false);
			expect(res.body.todo.completedAt).toNotExist();

		})

 .end(done);

		
 });

	});


describe('GET /users/me', () => {
 it('should return users if authenticated', (done) => 
	{
		request(app)
		.get('/users/me')
		.set('x-auth', users[0].tokens[0].token)
		.expect(200)
		.expect((res)=> {
			expect(res.body._id).toBe(users[0]._id.toHexString());
			expect(res.body.email).toBe(users[0].email);

		})
		.end(done);

	});

it('should return 401 if not authenticated', (done) => 
	{
		request(app)
		.get('/users/me')
		.expect(401)
		.expect((res)=> {
			expect(res.body).toEqual({});
		})
		.end(done);


	});

});

describe('POST /users', () => {
 it('should create a user', (done) => 
	{
		var email='example@example.com';
		var password= '123mnb!';

		request(app)
		.post('/users')
		.send({email,password})
		.expect(200)
		.expect((res)=> {
			expect(res.header['x-auth']).toExist();
			expect(res.body.email).toBe(email);

		})
		.end(done);

	});

it('should return validation errors if request invalid', (done) => 
	{
		
		request(app)
		.post('/users')
		.send({
			email: 'and',
			password: '123'})
		.expect(400)
		.end(done);

	});


it('should not create user if email is in use', (done) => 
	{
		request(app)
		.post('/users')
		.send({
			email: users[0].email,
			password: 'Password123!'})
		.expect(400)
		.end(done);


	});

});



