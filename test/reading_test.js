const assert = require('assert');
const User = require('../src/user');

describe('Reading recorders out of the database', () => {
let joe, maria, alex, zach;
   beforeEach((done) => {
     joe = new User({ name: 'Joe' });
     maria = new User({ name: 'Maria' });
     alex = new User({ name: 'Alex' });
     zach = new User({ name: 'Zach' });
     //joe.save()
     Promise.all([joe.save(), maria.save(), alex.save(), zach.save()]) // Multi-add
        .then(() => done());
   });

   it('Find all users with the name of Joe', (done) => {
     User.find({ name: 'Joe' })
        .then((users) => {
          assert(users[0]._id.toString() === joe._id.toString());
          done();
        });
   });
   it('Find a user with ID', (done) => {
     User.findOne({ _id: joe._id })
        .then((user) => {
          assert(user.name === 'Joe');
          done();
        });
   });
   it('can skip and limit reading results set', (done) => {
     User.find({})
     .sort({ name: 1 })
     .skip(1)
     .limit(1)
       .then((user) => {
         //console.log(user);
         assert(user.length === 1);
         assert(user[0].name === 'Joe');
         done();
       });
   });
});
