"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const categoria_model_1 = require("../Models/categoria.model");
let CategoriasService = class CategoriasService {
    constructor(categoriaModel) {
        this.categoriaModel = categoriaModel;
    }
    async create(categoria) {
        try {
            const createdCategoria = new this.categoriaModel(categoria);
            await createdCategoria.save();
            return createdCategoria;
        }
        catch (error) {
            console.log(error);
            throw new Error('Erro ao cadastrar categoria!');
        }
    }
    async get() {
        try {
            const categorias = await this.categoriaModel.find().exec();
            return categorias;
        }
        catch (error) {
            throw new Error('Erro ao buscar categorias!');
        }
    }
    async getById(id) {
        try {
            const categoria = await this.categoriaModel.findById(id).exec();
            return categoria;
        }
        catch (error) {
            throw new Error('Erro ao buscar categorias!');
        }
    }
    async delete(id) {
        try {
            await this.categoriaModel.findByIdAndDelete(id).exec();
        }
        catch (error) {
            throw new Error('Erro ao deletar categoria!');
        }
    }
    async update(id, updateData) {
        try {
            const categoria = await this.categoriaModel.findById(id).exec();
            if (!categoria) {
                throw new Error('Categoria não encontrada');
            }
            const idsParaRemover = (updateData.idsProdutos || []).filter((idProduto) => categoria.idsProdutos.includes(idProduto));
            await this.categoriaModel
                .findByIdAndUpdate(id, { $pull: { idsProdutos: { $in: idsParaRemover } } }, { new: true })
                .exec();
            const idsParaAdicionar = (updateData.idsProdutos || []).filter((idProduto) => !categoria.idsProdutos.includes(idProduto));
            const updatedCategoria = await this.categoriaModel
                .findByIdAndUpdate(id, { $addToSet: { idsProdutos: { $each: idsParaAdicionar } } }, { new: true })
                .exec();
            return updatedCategoria;
        }
        catch (error) {
            throw new Error('Erro ao atualizar categoria!');
        }
    }
};
exports.CategoriasService = CategoriasService;
exports.CategoriasService = CategoriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(categoria_model_1.Categoria.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriasService);
//# sourceMappingURL=categorias.service.js.map