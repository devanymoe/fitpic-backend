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
  getLastPicture: function(id, type) {
    return Pictures().select().where({user_id: id, type: type}).orderBy('date', 'DESC').limit(1);
  },
  getAllUserMeasures: function(id) {
    return Measurements().select().where('user_id', id).orderBy('date', 'DESC');
  },
  postNewMeasure: function(id, body) {
    var obj = {
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
    }
    console.log(obj)
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
    }, '*');
  },
  deleteMeasure: function(measure_id) {
    return Measurements().where('id', measure_id).del();
  },
  postImage: function(url, type, date, user_id) {
    return Pictures().insert({user_id: user_id, date: date, type: type, url: url}, '*')
  }
}
