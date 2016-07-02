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
    return Pictures().select().where('user_id', id);
  },
  getAllUserMeasures: function(id) {
    return Measurements().select().where('user_id', id);
  }
}
