import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { CategoriaModule } from './Categorias/categorias.module';
import { ProdutosModule } from './Produtos/produtos.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';

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
