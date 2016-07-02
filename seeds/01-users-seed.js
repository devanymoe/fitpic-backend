exports.seed = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE users_id_seq restart with 1;').then(function() {
    return knex('users').del().then(function() {
      return Promise.join(
        knex('users').insert({
          id: 1,
          username: 'devanymoe',
          email: 'devanymoe@gmail.com',
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
