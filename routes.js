const express = require("express");
const routes = express.Router();

const perifericosController = require('./controllers/PerifericosController');
const UsuarioController = require('./controllers/UsuarioController');
const login = require('./controllers/loginController');
const loginTest = require('./middleware/login');

routes
      .get("/perifericosGeral", loginTest, perifericosController.perifericosGeral)
      .get("/perifericos", loginTest, perifericosController.list)
      .get("/destaque", loginTest, perifericosController.destaques)
      .post("/destaque/:id", loginTest, perifericosController.bestPeriferico)
      .post("/perifericos", loginTest, perifericosController.addPeriferico)
      .delete("/perifericos/:id", loginTest, perifericosController.deletePeriferico)
      .put("/perifericos/:id", loginTest, perifericosController.updatePeriferico)
      .get("/search/:search", loginTest, perifericosController.searchPeriferico);

routes
      .get("/usuarios", UsuarioController.users)
      .post("/login", login.login)
      .post("/usuarios", UsuarioController.registerUser)
      .delete("/usuarios/:id", UsuarioController.deleteUser)
      .put("/usuarios/:id", UsuarioController.updateUser);

module.exports = routes;