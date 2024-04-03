import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { Produto, ProdutoSchema } from './Produtos/schemas/produto.schema';
import {
  Categoria,
  CategoriaSchema,
} from './Categorias/schemas/categoria.schema';
import { ProdutosController } from './Produtos/produtos.controller';
import { CategoriasService } from './Categorias/categorias.service';
import { CategoriasController } from './Categorias/categorias.controller';
import { ProdutosService } from './Produtos/produtos.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriaModule } from './Categorias/categorias.module';
import { ProdutosModule } from './Produtos/produtos.module';

config();

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://renanjdr123:senha123@controledeestoque.4xr5tju.mongodb.net/',
    ),
    AuthModule,
    UsersModule,
    CategoriaModule,
    ProdutosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}
