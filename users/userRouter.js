const express = require('express');

const router = express.Router();

////////////////////////////////////////////////

const UserInfo = require('./users/userDb');


router.post('/', (req, res) => {
  // do your magic!
  UserInfo.insert()
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  UserInfo.insert()
});

router.get('/', (req, res) => {
  // do your magic!
  UserInfo.get()
});

router.get('/:id', (req, res) => {
  // do your magic!
  UserInfo.getById()
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  UserInfo.getById()
});

router.delete('/:id', (req, res) => {
  // do your magic!
  UserInfo.remove()
});

router.put('/:id', (req, res) => {
  // do your magic!
  UserInfo.update()
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
