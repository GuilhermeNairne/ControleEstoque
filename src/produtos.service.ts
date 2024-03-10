import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Produto, ProdutoDocument } from './produto.model';

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
}
