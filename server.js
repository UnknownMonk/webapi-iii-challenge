const express = require('express');

const server = express();

const posts = require('./posts/postsRoutes');
const user = require('./user/userRoutes');

server.use(express.json());

server.use('/api/posts', posts);
server.use('/api/posts', user);
server.use('/', (req, res) => {
  res.status(200).json('Express home route');
});

module.exports = server;
