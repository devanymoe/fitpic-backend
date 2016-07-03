exports.seed = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE pictures_id_seq restart;').then(function() {
    return knex('pictures').del().then(function() {
      return Promise.join(
        knex('pictures').insert({
          user_id: 1,
          date: '2016-07-01T20:48:51.564Z',
          type: 'front',
          url: 'http://i.imgur.com/dHykGn6.jpg'
        }),
        knex('pictures').insert({
          user_id: 1,
          date: '2016-07-01T20:48:51.564Z',
          type: 'back',
          url: 'https://unsplash.it/300/400?image=600'
        }),
        knex('pictures').insert({
          user_id: 1,
          date: '2016-07-01T20:48:51.564Z',
          type: 'side',
          url: 'https://unsplash.it/300/400?image=650'
        }),
        knex('pictures').insert({
          user_id: 1,
          date: '2016-07-01T20:48:51.564Z',
          type: 'side',
          url: 'https://unsplash.it/300/400?image=660'
        }),
        knex('pictures').insert({
          user_id: 1,
          date: '2016-06-04T20:48:51.564Z',
          type: 'front',
          url: 'http://i.imgur.com/bi4V28B.jpg'
        }),
        knex('pictures').insert({
          user_id: 1,
          date: '2016-05-02T20:48:51.564Z',
          type: 'front',
          url: 'http://i.imgur.com/czlQMFU.jpg'
        }),
        knex('pictures').insert({
          user_id: 1,
          date: '2016-05-02T20:48:51.564Z',
          type: 'back',
          url: 'https://unsplash.it/300/400?image=661'
        }),
        knex('pictures').insert({
          user_id: 1,
          date: '2016-05-02T20:48:51.564Z',
          type: 'side',
          url: 'https://unsplash.it/300/400?image=662'
        }),
        knex('pictures').insert({
          user_id: 1,
          date: '2016-04-013T20:48:51.564Z',
          type: 'front',
          url: 'https://unsplash.it/300/400?image=664'
        }),
        knex('pictures').insert({
          user_id: 1,
          date: '2016-04-013T20:48:51.564Z',
          type: 'back',
          url: 'https://unsplash.it/300/400?image=665'
        }),
        knex('pictures').insert({
          user_id: 1,
          date: '2016-04-013T20:48:51.564Z',
          type: 'side',
          url: 'https://unsplash.it/300/400?image=668'
        })
      );
    })
  })
}
