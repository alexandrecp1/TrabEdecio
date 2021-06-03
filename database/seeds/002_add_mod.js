exports.seed = function (knex) {
  return knex('perifericos').del()
    .then(function () {
      return knex('perifericos').insert([
        {
          empresa: "Ryzen 5 5600x",
          foto: "LinkFoto",
          descricao: "Processador muito bom, de ótima qualidade!",
          preco: 1900, 
          marca_id: 1
        },

        {
          empresa: "Rtx 2060 Super",
          foto: "LinkFoto",
          descricao: "Roda todos os jogos da atualidade!",
          preco: 7899,
          marca_id: 2
        },

        {
          empresa: "i7-8700",
          foto: "LinkFoto",
          descricao: "Processador concorrente da marca Ryzen!",
          preco: 2700,
          marca_id: 4
        }
      ]);
    });
};
