const BaseService = require('./base.service');
let _ideaRepository = null;

class IdeaService extends BaseService {
   constructor({ IdeaRepository}) {
      super(IdeaRepository);
      _ideaRepository = IdeaRepository;
   }

   async getUserIdeas(author) {
      if (!author) {
         const error = new Error();
         error.status = 400;
         error.message = 'Bad Request: author must be provided';
         throw error;
      }

      return await _ideaRepository.getUserIdeas(author);
   }

   async upvoteIdea(ideaId) {
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

      idea.upvotes.push(true);
      return await _ideaRepository.update(ideaId, { upvotes: idea.upvotes });
   }

   async downvoteIdea(ideaId) {
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

      idea.downvotes.push(true);
      return await _ideaRepository.update(ideaId, { downvotes: idea.downvotes });
   }
}

module.exports = IdeaService;