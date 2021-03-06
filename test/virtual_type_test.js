const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('Test post counts returned', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post title 1'}]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(joe.postCount === 1);
        done();
      });
  });
});
