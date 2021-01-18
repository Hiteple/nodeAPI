const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('express-async-errors');
const { NotFoundMiddleware, ErrorMiddleware, AuthMiddleware } = require('../middlewares');
const swaggerUI = require('swagger-ui-express');
const { SWAGGER_PATH } = require('../config');
const swaggerDoc = require(SWAGGER_PATH);

module.exports = ({ HomeRoutes, UserRoutes, IdeaRoutes, CommentRoutes, AuthRoutes }) => {
   const router = express.Router();
   const apiRoutes = express.Router();

   // Middlewares
   apiRoutes
      .use(express.json())
      .use(cors())
      .use(helmet())
      .use(compression());
   
   // Routes
   apiRoutes.use('/home', HomeRoutes);
   apiRoutes.use('/user', UserRoutes);
   apiRoutes.use('/idea', IdeaRoutes);
   apiRoutes.use('/comment', CommentRoutes);
   apiRoutes.use('/auth', AuthRoutes);

   // Prefix for all routes
   router.use('/v1/api', apiRoutes);
   router.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

   router.use(NotFoundMiddleware);
   router.use(ErrorMiddleware);

   return router;
};