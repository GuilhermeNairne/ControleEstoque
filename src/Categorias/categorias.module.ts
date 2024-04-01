import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Categoria, CategoriaSchema } from './schemas/categoria.schema';
import { ProdutosService } from 'src/Produtos/produtos.service';
import { Produto, ProdutoSchema } from 'src/Produtos/schemas/produto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Categoria.name, schema: CategoriaSchema },
      { name: Produto.name, schema: ProdutoSchema },
    ]),
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService, ProdutosService],
  exports: [CategoriasService],
})
export class CategoriaModule {}
