import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria, CategoriaDocument } from 'src/Models/categoria.model';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name)
    private categoriaModel: Model<CategoriaDocument>,
  ) {}

  async create(categoria: Categoria): Promise<Categoria> {
    try {
      const createdCategoria = new this.categoriaModel(categoria);
      await createdCategoria.save();
      return createdCategoria;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao cadastrar categoria!');
    }
  }

  async get() {
    try {
      const categorias = await this.categoriaModel.find().exec();
      return categorias;
    } catch (error) {
      throw new Error('Erro ao buscar categorias!');
    }
  }

  async getById(id: string) {
    try {
      const categoria = await this.categoriaModel.findById(id).exec();
      return categoria;
    } catch (error) {
      throw new Error('Erro ao buscar categorias!');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.categoriaModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new Error('Erro ao deletar categoria!');
    }
  }

  async update(id: string, updateData: Partial<Categoria>): Promise<Categoria> {
    try {
      // Verifica se a categoria existe
      const categoria = await this.categoriaModel.findById(id).exec();
      if (!categoria) {
        throw new Error('Categoria não encontrada');
      }

      // Remove os idsProdutos que já estão cadastrados
      const idsParaRemover = (updateData.idsProdutos || []).filter(
        (idProduto) => categoria.idsProdutos.includes(idProduto),
      );

      // Remove os idsProdutos que já estão cadastrados na categoria
      await this.categoriaModel
        .findByIdAndUpdate(
          id,
          { $pull: { idsProdutos: { $in: idsParaRemover } } },
          { new: true },
        )
        .exec();

      // Adiciona os idsProdutos que não estão cadastrados na categoria
      const idsParaAdicionar = (updateData.idsProdutos || []).filter(
        (idProduto) => !categoria.idsProdutos.includes(idProduto),
      );

      const updatedCategoria = await this.categoriaModel
        .findByIdAndUpdate(
          id,
          { $addToSet: { idsProdutos: { $each: idsParaAdicionar } } },
          { new: true },
        )
        .exec();

      return updatedCategoria;
    } catch (error) {
      throw new Error('Erro ao atualizar categoria!');
    }
  }
}
