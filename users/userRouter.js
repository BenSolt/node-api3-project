const express = require('express');

const router = express.Router();

////////////////////////////////////////////////

const UserInfo = require('./users/userDb');


//POST(ADD) USER - validateUser
////////////////////////////////////////////////////////////////
router.post('/', validateUser('name'), (req, res) => {
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


//POST(ADD) USER POST -validateUserId
/////////////////////////////////////////////////////////////////////////
router.post('/:id/posts', validateUserId(id), (req, res) => {
  if (!req.params.id){
    res.status(400).json({
    message: "The Users post with the specified ID does not exist."})
  }
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
//////////////////////////////////////////////////////////////////////////
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

//GET USERS ID by POSTS - validatePost
/////////////////////////////////////////////////////////////////////
router.get('/:id/posts', validatePost, (req, res) => {
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


////////////////////CUSTOM MIDDLEWARE////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function validateUserId(req, res, next) {
  // do your magic!
  return function(req, res, next) {

    if (req.body[req.params.id]) {
      next();
    } else {
      res.status(400).json({ errorMessage: `required ${req.params.id}` });
    }
  };
  // if (!req.params.id){
  //   res.status(400).json({
  //   message: "The post with the specified ID does not exist."})
  // }
}
////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function validateUser(req, res, next) {
  // do your magic!
  return function(req, res, next) {
    if (req.body[prop]) {
      next();
    } else {
      res.status(400).json({ errorMessage: `required ${prop}` });
    }
  };

}
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function validatePost(req, res, next) {
  // do your magic!
  if (!req.params.id){
    res.status(400).json({
    message: "The Users post with the specified ID does not exist."})
  }
}

module.exports = router;
