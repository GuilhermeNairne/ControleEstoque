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
exports.ProdutosController = void 0;
const common_1 = require("@nestjs/common");
const produtos_service_1 = require("./produtos.service");
const produto_model_1 = require("./produto.model");
let ProdutosController = class ProdutosController {
    constructor(produtosService) {
        this.produtosService = produtosService;
    }
    async create(produto) {
        return this.produtosService.create(produto);
    }
    async get() {
        return this.produtosService.get();
    }
    async delete(id) {
        try {
            await this.produtosService.delete(id);
        }
        catch (error) {
            console.log(error);
            throw new Error('Erro ao excluir produto.');
        }
    }
    async update(id, updateData) {
        console.log('aquiiii', id, updateData);
        try {
            const updatedProduto = await this.produtosService.update(id, updateData);
            return updatedProduto;
        }
        catch (error) {
            console.log(error);
            throw new Error('Erro ao atualizar produto.');
        }
    }
};
exports.ProdutosController = ProdutosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [produto_model_1.Produto]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "get", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProdutosController.prototype, "update", null);
exports.ProdutosController = ProdutosController = __decorate([
    (0, common_1.Controller)('/produtos'),
    __metadata("design:paramtypes", [produtos_service_1.ProdutosService])
], ProdutosController);
//# sourceMappingURL=produtos.controller.js.map