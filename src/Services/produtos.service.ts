import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Produto, ProdutoDocument } from '../Models/produto.model';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectModel(Produto.name) private produtoModel: Model<ProdutoDocument>,
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
      const produtos = await this.produtoModel.find().exec();
      return produtos;
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
      console.log(error);
      throw new Error('Erro ao atualizar produto.');
    }
  }
}
