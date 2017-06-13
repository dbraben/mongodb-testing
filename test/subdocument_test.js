const assert = require('assert');
const User = require('../src/user');

describe('User posts', () => {
   it('User can create a post', (done) => {
     const joe = new User({
       name: 'Joe',
       posts: [
         {title: 'HelloWorld!'}
       ]
     });
     joe.save()
       .then(() => User.findOne({ name: 'Joe' }))
       .then((user) => {
         assert(user.posts[0].title == 'HelloWorld!');
         done();
       });
   });
   it('User can create a post after being created', (done) => {
     const joe = new User({
       name: 'Joe',
       posts: []
     });
     joe.save()
       .then(() => User.findOne({ name: 'Joe' }))
       .then((User) => {
         User.posts.push({ title: 'HelloWorld!'});
         return User.save();
       })
       .then(() => User.findOne({ name: 'Joe' }))
       .then((user) => {
         assert(user.posts[0].title === 'HelloWorld!');
         done();
       });
   });
   it('User can remove a post after being created', (done) => {
     const joe = new User({
       name: 'Joe',
       posts: [
         { title: 'HelloWorld!' }
       ]
     });
     joe.save()
       .then(() => User.findOne({ name: 'Joe' }))
       .then((User) => {
         assert(User.posts[0].title === 'HelloWorld!');
         User.posts.pop({ title: 'HelloWorld!'});
         return User.save();
       })
       .then(() => User.findOne({ name: 'Joe' }))
       .then((user) => {
         assert(user.posts.length === 0);
         done();
       });
   });

});
