exports.seed = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE measurements_id_seq restart;').then(function() {
    return knex('measurements').del().then(function() {
      return Promise.join(
        knex('measurements').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-05T20:48:51.564Z',
          weight: '185',
          neck: '14',
          arm: '16',
          chest: '42',
          waist: '40',
          hips: '48',
          thigh: '33',
          calf: '19'
        }),
        knex('measurements').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-08T20:48:51.564Z',
          weight: '162',
          neck: '13',
          arm: '14',
          chest: '38',
          waist: '36',
          hips: '43',
          thigh: '28',
          calf: '17'
        }),
        knex('measurements').insert({
          user_id: 'google-oauth2|114974362814664392160',
          date: '2016-07-10T20:48:51.564Z',
          weight: '140',
          neck: '12',
          arm: '11',
          chest: '36',
          waist: '32',
          hips: '41',
          thigh: '24',
          calf: '16'
        })
      );
    })
  })
}
