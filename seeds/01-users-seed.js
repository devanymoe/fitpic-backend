exports.seed = function(knex, Promise) {
  return knex('users').del().then(function() {
    return Promise.join(
      knex('users').insert({
        id: 'google-oauth2|114974362814664392160',
        username: 'derp',
        email: 'devanymoe@yahoo.com',
        units: 'us'
      })
    );
  })
}
