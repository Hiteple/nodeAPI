const { Router } = require('express');

module.exports = ({ AuthController }) => {
   const router = Router();
   router.post('/signup', AuthController.signUp);
   router.post('/signin', AuthController.signIn);
   return router;
};