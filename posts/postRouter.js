const express = require('express');

const router = express.Router();

/////////////////////////////////
const PostInfo = require('./posts/postDb');

router.get('/', (req, res) => {
  // do your magic!
  PostInfo.get()
});

router.get('/:id', (req, res) => {
  // do your magic!
  PostInfo.getById()
});

router.delete('/:id', (req, res) => {
  // do your magic!
  PostInfo.remove()
});

router.put('/:id', (req, res) => {
  // do your magic!
  PostInfo.update()
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
