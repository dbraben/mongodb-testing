const assert = require('assert');
const User = require('../src/user');


describe('Deleting user', () => {
let joe;
  beforeEach((done) =>{
    joe = new User({name: 'Joe'});
    joe.save()
    .then(() => done());
  });

  //Reusable function to assert name value
  function assertName(operation, done) {
    operation
    .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
    });
  }

  it('model instance remove', (done) => {
    assertName(joe.remove(), done);
  });

  it('class method remove', (done) => {
    assertName(User.remove({ name: 'Joe' }), done);
  });

  it('class method findAndRemove', (done) => {
    // Remove a bunch of records with some criteria
    assertName(User.findOneAndRemove({ name: 'Joe' }), done);
  });

  it('class method findByIdAndRemove', (done) => {
    assertName(User.findByIdAndRemove(joe._id), done);
  });
});
