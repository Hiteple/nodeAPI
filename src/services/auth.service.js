const { JwtHelper } = require('../helpers');
let _userService = null;

class AuthService {
   constructor({ UserService }) {
      _userService = UserService;
   }

   async signUp(user) {
      const { username } = user;
      const userExists = await _userService.getUserByUsername(username);
      if (userExists) {
         const error = new Error();
         error.status(401);
         error.message = 'User already exists';
         throw error;
      }

      return await _userService.create(user);
   }

   async signIn(user) {
      const { username, password } = user;
      const userExists = await _userService.getUserByUsername(username);
      if (!userExists) {
         const error = new Error();
         error.status(404);
         error.message = 'Not Found: Invalid credentials';
         throw error;
      }

      const validPassword = userExists.comparePasswords(password);
      if (!validPassword) {
         const error = new Error();
         error.status(404);
         error.message = 'Not Found: Invalid credentials';
         throw error;
      }

      const userToEncode = {
         username: userExists.username,
         id: userExists._id
      };

      const token = JwtHelper(userToEncode);

      return { token, user: userExists};
   }
}

module.exports = AuthService;