exports.seed = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE users_id_seq restart with 3;').then(function() {
    return knex('users').del().then(function() {
      return Promise.join(
        knex('users').insert({
          id: 1,
          username: 'derp',
          email: 'devanymoe@yahoo.com',
          units: 'us'
        }),
        knex('users').insert({
          id: 2,
          username: 'brianmathews',
          email: 'brianmathews@gmail.com',
          units: 'metric'
        })
      );
    })
  })
}
