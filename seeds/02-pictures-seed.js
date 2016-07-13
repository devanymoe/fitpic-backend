exports.seed = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE pictures_id_seq restart;').then(function() {
    return knex('pictures').del().then(function() {
      return Promise.join(
        knex('pictures').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-05T20:48:51.564Z',
          type: 'front',
          url: 'http://i.imgur.com/OH2icBq.jpg'
        }),
        knex('pictures').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-05T20:48:51.564Z',
          type: 'side',
          url: 'http://i.imgur.com/LWB09rm.jpg'
        }),
        knex('pictures').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-05T20:48:51.564Z',
          type: 'back',
          url: 'http://i.imgur.com/L9GmYhG.jpg'
        }),
        knex('pictures').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-08T20:48:51.564Z',
          type: 'front',
          url: 'http://i.imgur.com/GafZSDd.jpg'
        }),
        knex('pictures').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-08T20:48:51.564Z',
          type: 'side',
          url: 'http://i.imgur.com/UjctE8i.jpg'
        }),
        knex('pictures').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-08T20:48:51.564Z',
          type: 'back',
          url: 'http://i.imgur.com/Bt4eoDp.jpg'
        }),
        knex('pictures').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-10T20:48:51.564Z',
          type: 'front',
          url: 'http://i.imgur.com/ZJuslia.jpg'
        }),
        knex('pictures').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-10T20:48:51.564Z',
          type: 'side',
          url: 'http://i.imgur.com/jCocU7y.jpg'
        }),
        knex('pictures').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-10T20:48:51.564Z',
          type: 'back',
          url: 'http://i.imgur.com/KU4cKMh.jpg'
        })
      );
    })
  })
}
