"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var ormconfig_1 = require("./database/ormconfig");
var routes_1 = require("./routes");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 3001;
app.use((0, cors_1.default)({
    origin: ['http://localhost:3001', 'http://localhost:5173', /\.onrender\.com$/],
    credentials: true
})); // habilita o cors
app.use((0, cookie_parser_1.default)()); // habilita o cookie parser
app.use(express_1.default.json()); // habilita o express para receber dados no formato json
app.use(routes_1.default); // habilita as rotas
app.listen(port, function () {
    console.log("Servidor executando na porta ".concat(port));
    console.log("Banco de dados", ormconfig_1.default.isInitialized ? 'inicializado' : 'não inicializado');
});
