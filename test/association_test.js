const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () =>{
  let joe, blogPost, comment;
  beforeEach((done) => {
     joe = new User({ name: 'Joe' });
     blogPost = new BlogPost({ title: 'JS is Great!', content: 'This is the content.' });
     comment = new Comment({ content: 'Hello from the comments' });

     joe.blogPosts.push(blogPost);
     blogPost.comments.push(comment);
     comment.user = joe;

     Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });
  it('Saves a relation between user and blog post', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'JS is Great!');
        done();
      });
  });
  it('Saves a full relation graph', (done) =>{
      User.findOne({ name: 'Joe' })
        .populate({
          path: 'blogPosts',
          populate: {
            path: 'comments',
            model: 'comment',
               populate: {
                 path: 'user',
                 model: 'user'
               }
          }
        })
        .then((user) => {
          // console.log(user.blogPosts[0].comments[0].user.name);
          // console.log(user.blogPosts[0].comments[0].content);
          assert(user.name === 'Joe');
          assert(user.blogPosts[0].title === 'JS is Great!');
          assert(user.blogPosts[0].comments[0].content === 'Hello from the comments');
          done();
        });
  });
});
