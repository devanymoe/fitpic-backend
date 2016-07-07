exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.string('id').unique().notNullable();
    table.string('username');
    table.string('email').unique();
    table.string('units');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
