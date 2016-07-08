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
  },
  getProgress: function(id) {
    console.log('got to model')
    return Measurements().select().where('user_id', id).orderBy('date', 'ASC').limit(1)
    .then(function(firstMeasure) {
      return Measurements().select().where('user_id', id).orderBy('date', 'DESC').limit(1)
    .then(function(lastMeasure) {
      return Pictures().select().where('user_id', id).andWhere('type', 'front').orderBy('date', 'ASC').limit(1)
    .then(function(firstFront) {
      return Pictures().select().where('user_id', id).andWhere('type', 'front').orderBy('date', 'DESC').limit(1)
      .then(function(lastFront) {
        return Pictures().select().where('user_id', id).andWhere('type', 'side').orderBy('date', 'ASC').limit(1)
      .then(function(firstSide) {
        return Pictures().select().where('user_id', id).andWhere('type', 'side').orderBy('date', 'DESC').limit(1)
      .then(function(lastSide) {
        return Pictures().select().where('user_id', id).andWhere('type', 'back').orderBy('date', 'ASC').limit(1)
      .then(function(firstBack) {
        return Pictures().select().where('user_id', id).andWhere('type', 'back').orderBy('date', 'DESC').limit(1)
      .then(function(lastBack) {
        var firstM = firstMeasure[0] || undefined;
        var lastM = firstMeasure[0] || undefined;
        var firstF = firstFront[0].url || undefined;
        var firstS = firstSide[0].url || undefined;
        var firstB = firstBack[0].url || undefined;
        var lastF = lastFront[0].url || undefined;
        var lastS = lastSide[0].url || undefined;
        var lastB = lastBack[0].url || undefined;
        return {
          measurements: {
            first: firstM,
            last: lastM
          },
          pictures: {
            first: {
              front: firstF,
              side: firstS,
              back: firstB
            },
            last: {
              front: lastF,
              side: lastS,
              back: lastB
            }
          }
        };
      });
    });
    });
    });
    });
    });
    });
    });
  }
}
