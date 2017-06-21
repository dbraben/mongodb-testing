const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than two characters'
    },
    required: [true, 'Name is required']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});
//Important to use function to keep the context
// rather than a arrow function
UserSchema.virtual('postCount').get(function(user){
  return this.posts.length;
})

const User = mongoose.model('user', UserSchema);

module.exports = User;
