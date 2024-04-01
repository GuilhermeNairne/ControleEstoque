import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Produto {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  categoriaId: string;

  @Prop({ required: true })
  preço: number;

  @Prop({ required: true })
  quantidade: number;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
