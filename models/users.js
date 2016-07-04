var knex = require('../db/knex');

function Users() {
  return knex('users');
}

function Pictures() {
  return knex('pictures');
}

function Measurements() {
  return knex('measurements');
}

module.exports = {
  getUser: function(id) {
    return Users().where('id', id);
  },
  getAllUserPictures: function(id) {
    return Pictures().select().where('user_id', id).orderBy('date', 'DESC').orderBy('type');
  },
  getAllUserMeasures: function(id) {
    return Measurements().select().where('user_id', id).orderBy('date', 'DESC');
  },
  postNewMeasure: function(id, body) {
    console.log(body);
    return Measurements().insert({
      user_id: id,
      date: body.date,
      weight: body.weight,
      neck: body.neck,
      arm: body.arm,
      chest: body.chest,
      waist: body.waist,
      hips: body.hips,
      thigh: body.thigh,
      calf: body.calf
    });
  }
}
