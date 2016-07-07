exports.seed = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE measurements_id_seq restart;').then(function() {
    return knex('measurements').del().then(function() {
      return Promise.join(
        knex('measurements').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-01T20:48:51.564Z',
          weight: '225',
          neck: '20',
          arm: '32',
          chest: '44',
          waist: '36',
          hips: '32',
          thigh: '34',
          calf: '14'
        }),
        knex('measurements').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-06-04T20:48:51.564Z',
          weight: '189',
          neck: '18',
          arm: '27',
          chest: '41',
          waist: '34',
          hips: '32',
          thigh: '34',
          calf: '13'
        }),
        knex('measurements').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-05-02T20:48:51.564Z',
          weight: '160',
          neck: '15',
          arm: '25',
          chest: '38',
          waist: '31',
          hips: '30',
          thigh: '34',
          calf: '12'
        })
      );
    })
  })
}
