const express = require('express');

const validateUser = require('./users/userRouter');
const validateUserId = require('./users/userRouter');
const validatePost = require('./users/userRouter');
const validatePostId = require('./posts/postRouter');

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware
///////////////////////////////////////////////////////
server.use(validateUser);
server.use(validateUserId);
server.use(validatePost);
server.use(validatePostId);

server.use(logger)


server.use('/api/users', userRouter)
server.use('/api/posts', postRouter)
////////////////////////////////////////////////////

function logger(req,res, next) {
  const {method, originalURL} = req;
  console.log(`${method} to ${originalURL}`);

  next();
}

module.exports = server;
