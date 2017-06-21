const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) =>{
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', ()=> { done(); })
    .on('error', (error) => {
      console.warn('Error', error);
  });
});

beforeEach((done) => {
  const { users, blogposts, comments } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() =>{
      blogposts.drop(() => {
        done();
      });
    }); // Ready to run the next test
  });
});
