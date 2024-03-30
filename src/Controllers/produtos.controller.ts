import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ProdutosService } from '../Services/produtos.service';
import { Produto } from '../Models/produto.model';
import { filterType } from 'src/types/produtosType';

@Controller('/produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  @Post()
  async create(@Body() produto: Produto): Promise<Produto> {
    return this.produtosService.create(produto);
  }

  @Get()
  async get(@Query() filter?: filterType) {
    return this.produtosService.get(filter);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.produtosService.delete(id);
    } catch (error) {
      throw new Error('Erro ao excluir produto.');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Produto>,
  ): Promise<Produto> {
    const updatedProduto = await this.produtosService.update(id, updateData);
    return updatedProduto;
  }
}
