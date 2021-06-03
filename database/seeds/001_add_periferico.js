exports.seed = function(knex) {
  return knex('marca').del()
    .then(function () {
      return knex('marca').insert([
        {nome: 'AMD'},
        {nome: 'NVidia'},
        {nome: 'Asus'},
        {nome: 'Intel'}
      ]);
    });
};
