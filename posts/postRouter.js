const express = require('express');

const router = express.Router();

////////////////////////////////////////////////////
const PostInfo = require('./posts/postDb');

//GET
////////////////////////////////////////////////////
router.get('/', (req, res) => {
  // do your magic!
  PostInfo.get(req.query)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  });
});

//GET BY ID
//////////////////////////////////////////////////////////////
router.get('/:id', validatePostId(id), (req, res) => {
  // do your magic!
  PostInfo.getById(req.params.id)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the post',
    });
  });
});

//DELETE
//////////////////////////////////////////////////////////////
router.delete('/:id', (req, res) => {
  // do your magic!
  PostInfo.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post is deleted!' });
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error deleting the post',
      });
    });
});

//PUT (EDIT/UPDATE)
/////////////////////////////////////////////////////////////
router.put('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  const changes = req.body;
  PostInfo.update(id, changes)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found!' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post',
    });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!

  if (req.body[req.params.id]) {
    next();
  } else {
    res.status(400).json({ errorMessage: `required ${req.params.id}` });
  }

}

module.exports = router;
