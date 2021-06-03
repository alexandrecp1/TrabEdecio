exports.up = (knex) => {
  return knex.schema.createTable('marca', (table) => {
    table.increments();
    table.string('nome', 60).notNullable();
  })
};

exports.down = (knex) => knex.schema.dropTable('perifericos'); 
