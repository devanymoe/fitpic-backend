exports.up = function(knex, Promise) {
  return knex.schema.createTable('measurements', function(table) {
    table.increments();
    table.string('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.dateTime('date');
    table.integer('weight');
    table.integer('neck');
    table.integer('arm');
    table.integer('chest');
    table.integer('waist');
    table.integer('hips');
    table.integer('thigh');
    table.integer('calf');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('measurements');
};
