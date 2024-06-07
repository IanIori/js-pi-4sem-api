"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
dotenv_1.default.config();
var dataBase = new typeorm_1.DataSource({
    type: 'sqlite',
    database: process.env.DATABASE || './src/database/database.sqlite',
    entities: [
        (0, path_1.join)(__dirname, '..', 'models/*.{ts,js}')
    ],
    logging: true,
    synchronize: true
});
dataBase.initialize()
    .then(function () {
    console.log("Banco de dados inicializado");
})
    .catch(function (err) {
    console.error("Erro ao inicializar o banco de dados", err);
});
exports.default = dataBase;
