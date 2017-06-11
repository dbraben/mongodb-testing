const assert = require('assert');
const User = require('../src/user');

describe('Creating recorders', () => {
   it('Saves a user', (done) => {
     const joe = new User({name: 'Joe'});

     joe.save()
      .then(() => {
          //has Joe been saved successfully?
          assert(!joe.isNew);
          done();
      });
   });
   it('Name equals Joe', (done) => {
     const joe = new User({name: 'Joe'});

     joe.save()
      .then(() => {
          //has Joe been saved successfully?
          assert(joe.name !== 'Joey');
          done();
      });
   });
});
