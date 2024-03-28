import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Produto, ProdutoDocument } from '../Models/produto.model';
import { CategoriasService } from './categorias.service';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectModel(Produto.name) private produtoModel: Model<ProdutoDocument>,
    private categoriaService: CategoriasService,
  ) {}

  async create(produto: Produto): Promise<Produto> {
    try {
      const createdProduto = new this.produtoModel(produto);
      await createdProduto.save();
      return createdProduto;
    } catch (error) {
      throw new Error('Erro ao cadastrar produto!');
    }
  }

  async get() {
    try {
      // Obter todos os produtos
      const produtos = await this.produtoModel.find().exec();

      // Obter os IDs de categoria únicos dos produtos
      const categoriaIds = produtos.map((produto) => produto.categoriaId);

      // Obter os nomes das categorias para cada categoriaId
      const categoriasPromises = categoriaIds.map((categoriaId) =>
        this.categoriaService.getById(categoriaId),
      );
      const categorias = await Promise.all(categoriasPromises);

      // Mapear os nomes das categorias para cada produto
      const produtosComCategorias = produtos.map((produto, index) => ({
        ...produto.toObject(), // Convertendo o documento do Mongoose para um objeto JavaScript
        categoriaName: categorias[index]?.nome || 'Categoria não encontrada', // Se a categoria não for encontrada, exibe uma mensagem de erro
      }));

      // Retornar os produtos com os nomes das categorias
      return produtosComCategorias;
    } catch (error) {
      throw new Error('Erro ao trazer os produtos!');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.produtoModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error('Erro ao excluir produto.');
    }
  }

  async update(id: string, updateData: Partial<Produto>): Promise<Produto> {
    try {
      const updatedProduto = await this.produtoModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .exec();

      return updatedProduto;
    } catch (error) {
      throw new Error('Erro ao atualizar produto.');
    }
  }
}
