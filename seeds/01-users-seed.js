exports.seed = function(knex, Promise) {
  return knex('users').del().then(function() {
    return Promise.join(
      knex('users').insert({
        id: 'google-oauth2|109401067759378352001',
        username: 'derp',
        email: 'devanymoe@yahoo.com',
        units: 'us'
      })
    );
  })
}
