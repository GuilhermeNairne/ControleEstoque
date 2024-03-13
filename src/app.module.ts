import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from './produtos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Produto, ProdutoSchema } from './produto.model';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/snaptoon'),
    MongooseModule.forFeature([{ name: Produto.name, schema: ProdutoSchema }]),
  ],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class AppModule {}
