const { Router } = require('express');

module.exports = ({CommentController}) => {
   const router = Router();
   router.get('/:ideaId', CommentController.getIdeasComments);
   router.get('/:commentId/unique', CommentController.get);
   router.post('/:ideaId', CommentController.create);
   router.patch('/:userId', CommentController.update);
   router.delete('/:userId', CommentController.delete);

   return router;
};