import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Categoria } from 'src/Models/categoria.model';
import { CategoriasService } from 'src/Services/categorias.service';

@Controller('/categorias')
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}

  @Post()
  async create(@Body() categoria: Categoria): Promise<Categoria> {
    return await this.categoriasService.create(categoria);
  }

  @Get()
  async get() {
    return await this.categoriasService.get();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.categoriasService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.categoriasService.delete(id);
    } catch (error) {
      throw new Error('Erro ao excluir categoria');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<Categoria>,
  ): Promise<Categoria> {
    return await this.categoriasService.update(id, updateData);
  }
}
