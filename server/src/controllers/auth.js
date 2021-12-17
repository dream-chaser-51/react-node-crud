const express = require('express');
const sha1 = require('sha1');
const jwt = require("jsonwebtoken");

const router = express.Router();

function generateAccessToken(obj) {
  // expires after 30 minutes
  return jwt.sign(obj, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  // if there isn't any token
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, tokenObj) => {
    console.log('Error in auth', err);
    if (err) return res.sendStatus(401);
    req.authDetails = tokenObj;
    next(); // pass the execution off to whatever request the client intended
  })
}

router.post('/login', async (req, res) => {
  try {
    console.log(process.env.JWT_TOKEN_SECRET)
    const user = await global.sequelizeModels.users.findOne({
      where: {
        email: req.body.email
      }
    });

    console.log('use', user);
    console.log(user.password, '===', sha1(req.body.password));

    if (user && sha1(req.body.password) === user.password) {
      return res.json({
        success: true, user: {
          token: generateAccessToken({ userId: user.id }),
          id: user.id,
          email: user.email,
          phone: user.phone,
        }
      });
    }
    throw 'Invalid password';
  } catch (err) {
    console.error(err);
    res.json(errorMessage);
  }
});

router.generateAccessToken = generateAccessToken;
router.authenticateToken = authenticateToken;

module.exports = router;

