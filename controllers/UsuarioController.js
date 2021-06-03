const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const knex = require('../database/dbConfig');

module.exports = {

  //Returns User 
  async users(req, res) {
    const usuarios = await knex("usuarios");
    res.status(200).json(usuarios);
  },

  //Register User
  async registerUser(req, res) {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      res.status(400).json({ erro: "Enviar nome, email, senha do usuário" });
      return;
    }

    try {
      const dados = await knex("usuarios").where({ email });
      if (dados.length) {
        res.status(400).json({ erro: "E-mail já Cadastrado" });
        return;
      }
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }

    const hash = bcrypt.hashSync(senha, 5);

    try {
      const novo = await knex("usuarios").insert({ nome, email, senha: hash });
      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },


  //Delete User
  async deleteUser(req, res) {
    const id = req.params["id"];
    const Ids = await knex("usuarios").where({ id })
    if (Ids.length == 0) {
      res.status(200).json({ erro: "Usuario não cadastrado" })
      return;
    }
    try {
      await knex("usuarios").where({ id }).delete()
      res.status(201).json({ msg: "User Delleted Sucessfully." })
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  //Update User
  async updateUser(req, res) {
    const id = req.params["id"];
    const { email } = req.body;
    const Ids = await knex("usuarios").where({ id })

    if (Ids.length == 0) {
      res.status(400).json({ erro: "Usuario não cadastrado." })
      return;
    } else {
      if (!email) {
        res.status(400).json({ erro: "Enviar Dados" })
        return;
      } else {
        try {
          await knex("usuarios").where({ id }).update({ email })
          res.status(201).json({ msg: "Dados alterados." })
        } catch {
          res.status(400).json({ erro: error.message });
        }
      }
    }
  }
}