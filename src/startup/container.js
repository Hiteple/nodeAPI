const {createContainer, asClass, asValue, asFunction} = require('awilix');

// Config
const config = require('../config');
const app = require('.');

// Services
const {HomeService} = require('../services');

// Controllers
const { HomeController } = require('../controllers');

// Models
const { User, Idea, Comment } = require('../models');

// Routes
const { HomeRoutes } = require('../routes/index.routes');
const Routes = require('../routes');

// Repositories
const { UserRepository, IdeaRepository, CommentRepository} = require('../repositories');


// Container
const container = createContainer();
container
   // Main app
   .register({
      app: asClass(app).singleton(),
      router: asFunction(Routes).singleton(),
      config: asValue(config)
   })
   // Controllers
   .register({
      HomeController: asClass(HomeController.bind(HomeController)).singleton()
   })
   // Models
   .register({
      User: asValue(User),
      Idea: asValue(Idea),
      Comment: asValue(Comment)
   })
   // Routes
   .register({
      HomeRoutes: asFunction(HomeRoutes).singleton()
   })
   // Services
   .register({
      HomeService: asClass(HomeService).singleton()
   })
   // Repositories
   .register({
      UserRepository: asClass(UserRepository).singleton(),
      IdeaRepository: asClass(IdeaRepository).singleton(),
      CommentRepository: asClass(CommentRepository).singleton()
   })

module.exports = container;