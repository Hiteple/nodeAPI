const BaseService = require('./base.service');
let _commentRepository = null;
let _ideaRepository = null;

class CommentRepository extends BaseService {
   constructor({ CommentRepository, IdeaRepository}) {
      super(CommentRepository);
      _commentRepository = CommentRepository;
      _ideaRepository = IdeaRepository;
   }

   async getIdeaComments(ideaId) {
      if (!ideaId) {
         const error = new Error();
         error.status = 400;
         error.message = 'Bad Request: idea must be provided';
         throw error;
      }

      const idea = await _ideaRepository.get(ideaId);

      if (!idea) {
         const error = new Error();
         error.status = 404;
         error.message = 'Not Found';
         throw error;
      }

      const { comments } = idea;
      return comments;
   }

   async createComment(comment, ideaId) {
      if (!ideaId) {
         const error = new Error();
         error.status = 400;
         error.message = 'Bad Request: idea must be provided';
         throw error;
      }

      const idea = await _ideaRepository.get(ideaId);

      if (!idea) {
         const error = new Error();
         error.status = 404;
         error.message = 'Not Found';
         throw error;
      }

      const createdComment = await _commentRepository.create(comment);
      idea.comments.push(createdComment);
      return await _ideaRepository.update(ideaId, { comments: idea.comments });
   }

}

module.exports = CommentRepository;