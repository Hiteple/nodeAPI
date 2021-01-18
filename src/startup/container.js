const {createContainer, asClass, asValue, asFunction} = require('awilix');

// Config
const config = require('../config');
const app = require('.');

// Services
const { HomeService, UserService, IdeaService, CommentService } = require('../services');

// Controllers
const { HomeController, UserController, IdeaController, CommentController } = require('../controllers');

// Models
const { User, Idea, Comment } = require('../models');

// Routes
const { HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes } = require('../routes/index.routes');
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
      HomeController: asClass(HomeController.bind(HomeController)).singleton(),
      UserController: asClass(UserController.bind(UserController)).singleton(),
      IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
      CommentController: asClass(CommentController.bind(CommentController)).singleton()
   })
   // Models
   .register({
      User: asValue(User),
      Idea: asValue(Idea),
      Comment: asValue(Comment)
   })
   // Routes
   .register({
      HomeRoutes: asFunction(HomeRoutes).singleton(),
      UserRoutes: asFunction(UserRoutes).singleton(),
      IdeaRoutes: asFunction(IdeaRoutes).singleton(),
      CommentRoutes: asFunction(CommentRoutes).singleton()
   })
   // Services
   .register({
      HomeService: asClass(HomeService).singleton(),
      UserService: asClass(UserService).singleton(),
      IdeaService: asClass(IdeaService).singleton(),
      CommentService: asClass(CommentService).singleton(),
   })
   // Repositories
   .register({
      UserRepository: asClass(UserRepository).singleton(),
      IdeaRepository: asClass(IdeaRepository).singleton(),
      CommentRepository: asClass(CommentRepository).singleton()
   })

module.exports = container;