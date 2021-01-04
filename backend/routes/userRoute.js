import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth, isAdmin } from '../utils';

const router = express.Router();

router.post('/signin', async (req, res) => { //signin()
  const singinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if (singinUser) {
    res.send({
      _id: singinUser.id,
      name: singinUser.name,
      email: singinUser.email,
      isAdmin: singinUser.isAdmin,
      token: getToken(singinUser)
    })
  } else {
    res.status(401).send({ msg: 'Ivalid Email or Password' });
  }
})

router.get('/', isAuth, isAdmin, async (req, res) => { // signinWithAdmin()
  const users = await User.find({});
  res.send(users);
})

router.post('/register', async (req, res) => { // register()
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ message: 'Invalid User Data.' });
  }
});

router.put('/:id', isAuth, async (req, res) => { //updateUser()
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

router.get("/createadmin", async (req, res) => {  // getAdmin()
  try {
    const user = new User({
      name: 'Minh',
      email: 'tanminhtran169@gmail.com',
      password: '161718',
      isAdmin: true
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }

});

export default router;