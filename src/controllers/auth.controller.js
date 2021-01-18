let _authService = null;

class AuthController {
   constructor({ AuthService }) {
      _authService = AuthService;
   }

   async signUp(req, res) {
      const { body } = req;
      const createdUser = await _authService.signUp(body);
      return res.status(201).send(createdUser);
   }

   async signIn(req, res) {
      const { body } = req;
      const credentials = await _authService.signIn(body);
      return res.status(200).send(credentials);
   }
}

module.exports = AuthController;