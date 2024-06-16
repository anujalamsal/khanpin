const jwt = require('jsonwebtoken');
const Register = require('../models/registers');

const auth = async (req, res, next) => {
  try {
    console.log('Middleware function received');
    const token = req.cookies.jwt;
    console.log(`Token received in auth-page is ${token}`);

    if (!token) {
      return res.status(401).send('No token provided');
    }

    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyUser);

    const user = await Register.findOne({ _id: verifyUser._id });
    console.log(user);

    if (!user) {
      throw new Error();
    }

    else{
    req.user=user;
    console.log("auth.js user_id"+req.user_id);
    next();
    }

  } catch (error) {
    console.error(error);
    res.status(401).send('Invalid token');
  }
}

module.exports = auth;