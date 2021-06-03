module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : 'freedb.tech',
      user : 'freedbtech_alexandre',
      password : '123123',
      database : 'freedbtech_perifericos'
    },
    migrations: {
      tableName: 'migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }        
  }

};
