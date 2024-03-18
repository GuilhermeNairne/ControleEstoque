"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const produtos_controller_1 = require("./Controllers/produtos.controller");
const produtos_service_1 = require("./Services/produtos.service");
const mongoose_1 = require("@nestjs/mongoose");
const produto_model_1 = require("./Models/produto.model");
const dotenv_1 = require("dotenv");
const categorias_controller_1 = require("./Controllers/categorias.controller");
const categorias_service_1 = require("./Services/categorias.service");
const categoria_model_1 = require("./Models/categoria.model");
(0, dotenv_1.config)();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/snaptoon'),
            mongoose_1.MongooseModule.forFeature([{ name: produto_model_1.Produto.name, schema: produto_model_1.ProdutoSchema }]),
            mongoose_1.MongooseModule.forFeature([
                { name: categoria_model_1.Categoria.name, schema: categoria_model_1.CategoriaSchema },
            ]),
        ],
        controllers: [produtos_controller_1.ProdutosController, categorias_controller_1.CategoriasController],
        providers: [produtos_service_1.ProdutosService, categorias_service_1.CategoriasService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map