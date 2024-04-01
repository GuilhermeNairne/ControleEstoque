import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { jwtConstants } from 'src/auth/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { Produto, ProdutoSchema } from './schemas/produto.schema';
import { CategoriasService } from 'src/Categorias/categorias.service';
import {
  Categoria,
  CategoriaSchema,
} from 'src/Categorias/schemas/categoria.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Produto.name, schema: ProdutoSchema },
      { name: Categoria.name, schema: CategoriaSchema },
    ]),
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService, CategoriasService],
  exports: [ProdutosService],
})
export class ProdutosModule {}
