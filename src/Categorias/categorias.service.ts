import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './schemas/categoria.schema';
import { CategoriaDto } from './dtos/categorias.dtos';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel(Categoria.name)
    private categoriaModel: Model<Categoria>,
  ) {}

  async create(categoria: CategoriaDto): Promise<CategoriaDto> {
    try {
      const createdCategoria = new this.categoriaModel(categoria);
      await createdCategoria.save();
      return createdCategoria;
    } catch (error) {
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

  async update(
    id: string,
    updateData: Partial<CategoriaDto>,
  ): Promise<CategoriaDto> {
    try {
      //Verifica se possui uma categoria antiga. Esse caso ocorre quando muda a categoria do produto
      if (updateData.idCategoriaAntiga) {
        //Verifica se as duas caterias existem
        const categoriaAntiga = await this.categoriaModel
          .findById(updateData.idCategoriaAntiga)
          .exec();
        const categoriaAtual = await this.categoriaModel.findById(id).exec();

        //Verifica se o id do produto está cadastrado nessa categoria
        const idParaRemover = (updateData.idsProdutos || []).filter(
          (idProduto) => categoriaAntiga.idsProdutos.includes(idProduto),
        );

        //Remove o produto que está cadastrado na categoria antigaa
        await this.categoriaModel
          .findByIdAndUpdate(
            updateData.idCategoriaAntiga,
            { $pull: { idsProdutos: { $in: idParaRemover } } },
            { new: true },
          )
          .exec();

        //Verifica se o id do produto está cadastrado na categoria atual
        const idParaAdicionar = (updateData.idsProdutos || []).filter(
          (idProduto) => !categoriaAtual.idsProdutos.includes(idProduto),
        );

        //Adiciona o produto na categoria atual
        const updatedCategoria = await this.categoriaModel
          .findByIdAndUpdate(
            id,
            { $addToSet: { idsProdutos: { $each: idParaAdicionar } } },
            { new: true },
          )
          .exec();

        return updatedCategoria;
      }

      // Verifica se a categoria existe
      const categoria = await this.categoriaModel.findById(id).exec();
      if (!categoria) {
        throw new Error('Categoria não encontrada');
      }

      // Remove o idProduto que já estão cadastrados
      const idParaRemover = (updateData.idsProdutos || []).filter((idProduto) =>
        categoria.idsProdutos.includes(idProduto),
      );

      // Remove o idProduto que já estão cadastrados na categoria
      await this.categoriaModel
        .findByIdAndUpdate(
          id,
          {
            nome: updateData.nome,
            $pull: {
              idsProdutos: { $in: idParaRemover },
            },
          },
          { new: true },
        )
        .exec();

      // Adiciona o idProduto que não estão cadastrados na categoria
      const idParaAdicionar = (updateData.idsProdutos || []).filter(
        (idProduto) => !categoria.idsProdutos.includes(idProduto),
      );

      const updatedCategoria = await this.categoriaModel
        .findByIdAndUpdate(
          id,
          {
            nome: updateData.nome,
            $addToSet: {
              idsProdutos: { $each: idParaAdicionar },
            },
          },
          { new: true },
        )
        .exec();

      return updatedCategoria;
    } catch (error) {
      throw new Error('Erro ao atualizar categoria!');
    }
  }
}
