"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_routes_1 = require("./auth/auth.routes");
var cargo_routes_1 = require("./cargo/cargo.routes");
var routes = (0, express_1.Router)();
routes.use('/cargo', cargo_routes_1.default);
routes.use('/auth', auth_routes_1.default);
exports.default = routes;
