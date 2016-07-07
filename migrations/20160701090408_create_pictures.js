exports.up = function(knex, Promise) {
  return knex.schema.createTable('pictures', function(table) {
    table.increments();
    table.string('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.dateTime('date');
    table.string('type');
    table.string('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('pictures');
};
