const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'ghost',
    password : '',
    database : 'smart-brain'
  }
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// handlers

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.get('/', (req, res) => {res.send(database.users)})
app.post('/signin', signin.signinHandler(db, bcrypt));
app.post('/register', register.registerHandler(db, bcrypt));
app.get('/profile/:id', profile.profileHandler(db));
app.put('/image', image.imageHandler(db));
app.post('/imageurl', image.apiCallHandler());

app.listen(3001, () => {
  console.log('listening on port 3001...');
})
