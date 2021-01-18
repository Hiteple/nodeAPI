const { Schema, model } = require('mongoose');

const IdeaSchema = new Schema({
   idea: { type: String, required: true },
   description: { type: String },
   upvotes: [{ type: Boolean }],
   downvotes: [{ type: Boolean }],
   author: { type: Schema.Types.ObjectId, ref: 'user', required: true, autopopulate: true },
   comments: [{ type: Schema.Types.ObjectId, ref: 'comment', required: true, autopopulate: true }]
});

IdeaSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('idea', IdeaSchema);