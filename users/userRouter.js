const express = require('express');

const router = express.Router();

////////////////////////////////////////////////

const UserInfo = require('./users/userDb');


//POST(ADD) USER
////////////////////////////////////////////////
router.post('/', (req, res) => {
  // do your magic!
  UserInfo.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error adding the User!',
      });
    });
});

//POST(ADD) USER POST
////////////////////////////////////////////////
router.post('/:id/posts', (req, res) => {
  // do your magic!
  UserInfo.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error adding the User!',
    });
  });
});

//GET USERS
/////////////////////////////////////////////////////////////
router.get('/', (req, res) => {
  // do your magic!
  UserInfo.get(req.query)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the User',
    });
  });
});

//GET USER by ID
/////////////////////////////////////////////////////////
router.get('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  UserInfo.getById(id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the User',
    });
  });
});

//GET USERS ID by POSTS
/////////////////////////////////////////////////////////////////////
router.get('/:id/posts', (req, res) => {
  // do your magic!
  const id = req.params.id
  UserInfo.getById(id)
  .then(user => {
    res.status(200).json(user);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the User',
    });
  });
});

//DELETE USER
///////////////////////////////////////////////////////////////////////
router.delete('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id
  UserInfo.remove(id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The user is deleted!' });
    } else {
      res.status(404).json({ message: 'The User could not be found' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error deleting the User!',
    });
  });
});

//PUT (UPDATE/EDIT) USER
//////////////////////////////////////////////////////////////////////
router.put('/:id', (req, res) => {
  // do your magic!
  UserInfo.update()
  const id = req.params.id
  const changes = req.body;
  UserInfo.update(id, changes)
  .then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The User could not be found!' });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({
      message: 'Error updating the User',
    });
  });
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
