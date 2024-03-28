import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './produto.model';

@Controller('/produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  @Post()
  async create(@Body() produto: Produto): Promise<Produto> {
    return this.produtosService.create(produto);
  }

  @Get()
  async get() {
    return this.produtosService.get();
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
    try {
      const updatedProduto = await this.produtosService.update(id, updateData);
      return updatedProduto;
    } catch (error) {
      throw new Error('Erro ao atualizar produto.');
    }
  }
}
