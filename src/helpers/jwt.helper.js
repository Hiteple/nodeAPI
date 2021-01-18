const { sign } = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = (user) => {
   return sign({ user }, JWT_SECRET, { expiresIn: "2h" });
};