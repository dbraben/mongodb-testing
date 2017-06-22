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

// ==== Virtual example ====
// Important to use function to keep the context
// rather than a arrow function
// model instance is equal to this. hence function over fat-arrow
UserSchema.virtual('postCount').get(function(user){
  return this.posts.length;
});

// ==== Middleware example ====
// model instance is equal to 'this.' hence function over fat-arrow
// Query Operator (IN Modifier): Look in BlogPost list for IDs
// and if _id is in this.blogPosts list remove it
UserSchema.pre('remove', function(next){
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
