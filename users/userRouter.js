const express = require('express');

const router = express.Router();

////////////////////////////////////////////////

const UserInfo = require('../users/userDb');


//POST(ADD) USER - validateUser
////////////////////////////////////////////////////////////////
router.post('/',validateUser, (req, res) => {
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


//POST(ADD) USER POST -validateUserId validatePost
/////////////////////////////////////////////////////////////////////////
router.post('/:id/posts', validatePost,(req, res) => {
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
      message: 'Error adding the User Post!',
    });
  });
});

//GET USERS
//////////////////////////////////////////////////////////////////////////
router.get('/',validateUser, (req, res) => {
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
router.get('/:id',validateUserId, (req, res) => {
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
  UserInfo.getUserPosts(id)
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
router.put('/:id', validateUserId, (req, res) => {
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
// NOT SURE ABOUT THIS ONE!!!!

function validateUserId(req, res, next) {
  // do your magic!
  return function(req, res, next) {
    //if (req.params.id === id){
  //   (req.user) }
    if (req.user) {
      res.status(200)
    }else if(!req.user){
      //res.status(400).json({ errorMessage: `required ${req.params.id}` });
      res.status(400).json({ message: "invalid user id" })
    }else{
      next();
    }
  };
}

////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function validateUser(req, res, next) {
  // do your magic!
  if (!req.user) {
    res.status(400).json({ errorMessage: 'missing user data'});
  }else if(!req.body.name){ 
    res.status(400).json({ message: "missing required name field" })
  } else {
    next();
  }

}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({ errorMessage: 'missing post data'});
  }else if(!req.body.text){ 
    res.status(400).json({ message: "missing required text field" })
  } else {
    next();
  }
}

module.exports = router;
