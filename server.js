const express = require('express');

const server = express();

const posts = require('./posts/postsRoutes');
const user = require('./user/userRoutes');

server.use(express.json());

server.use('/api/posts', posts);
server.use('/api/user', user);
server.use('/', (req, res) => {
  res.status(200).json('Heroku is hiting the home route on my express app');
});

module.exports = server;
