import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProdutosController } from './Controllers/produtos.controller';
import { ProdutosService } from './Services/produtos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Produto, ProdutoSchema } from './Models/produto.model';
import { config } from 'dotenv';
import { CategoriasController } from './Controllers/categorias.controller';
import { CategoriasService } from './Services/categorias.service';
import { Categoria, CategoriaSchema } from './Models/categoria.model';
config();

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/snaptoon'),
    MongooseModule.forFeature([{ name: Produto.name, schema: ProdutoSchema }]),
    MongooseModule.forFeature([
      { name: Categoria.name, schema: CategoriaSchema },
    ]),
  ],
  controllers: [ProdutosController, CategoriasController],
  providers: [ProdutosService, CategoriasService],
})
export class AppModule {}
