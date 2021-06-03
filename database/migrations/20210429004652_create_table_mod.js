exports.up = (knex) => {
  return knex.schema.createTable('perifericos', (table) => {
    table.increments();
    table.string('empresa', 80).notNullable();
    table.string('foto').notNullable();
    table.string('descricao', 100).notNullable();
    table.decimal('preco', 9.2).notNullable();
    table.boolean("destaque").notNullable().defaultTo(false);

    table.integer('marca_id').notNullable().unsigned();
    table.foreign('marca_id')
         .references('marca.id')
         .onDelete('restrict')
         .onUpdate('cascade')

    table.timestamps(true, true);     
  })
};

exports.down = (knex) => knex.schema.dropTable('perifericos'); 
