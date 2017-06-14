const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) =>{
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
    .then(() => done());
  });

  //Reusable function to assert name value
  function assertName(operation, done) {
    operation
    .then(() => User.find({}))
      .then((users) => {
        assert(users[0].name === 'Joey');
        done();
    });
  }

  it('model instance update using set n save', (done) => {
    joe.set('name', 'Joey');
    assertName(joe.save(), done);
  });

  it('model instance can update', (done) => {
    assertName(joe.update({ name: 'Joey'}), done);
  });

  it('A model class can update', (done) => {
    //Select all items with the given value and replace with second param
    assertName(User.update({ name: 'Joe' }, { name: 'Joey' }), done);
  });

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Joey' }), done);
  });

  it('A model class can find an item by ID and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Joey' }), done);
  });

  it('A user can have the Like Count incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 }})
       .then(() => User.findOne({ name: 'Joe' }))
       .then((user) => {
          assert(user.likes === 1);
          done();
       });
  });
});
