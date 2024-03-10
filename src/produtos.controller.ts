import { Controller, Post, Body } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { Produto } from './produto.model';

@Controller('/produtos')
export class ProdutosController {
  constructor(private produtosService: ProdutosService) {}

  @Post()
  async create(@Body() produto: Produto): Promise<Produto> {
    return this.produtosService.create(produto);
  }
}
