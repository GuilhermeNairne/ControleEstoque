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
import { ProdutosService } from './produtos.service';
import { Produto } from './schemas/produto.schema';
import { filterType } from 'src/Categorias/produtosType';
import { ProdutoDto } from './dtos/produtos.dto';

@Controller('/produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  @Post()
  async create(@Body() produto: ProdutoDto): Promise<ProdutoDto> {
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
    @Body() updateData: Partial<ProdutoDto>,
  ): Promise<ProdutoDto> {
    const updatedProduto = await this.produtosService.update(id, updateData);
    return updatedProduto;
  }
}
