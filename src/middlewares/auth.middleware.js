const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
   const token = req.headers['authorization'];
   if (!token) {
      const error = new Error();
      error.status = 400;
      error.message = 'Bad Request';
      throw error;
   }

   jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
         const error = new Error();
         error.status = 401;
         error.message = 'Unauthorized';
         throw error;
      }

      req.user = decodedToken.user;
      next();
   });
};