import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Produto {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true })
  categoriaId: string;

  @Prop({ required: true })
  preço: number;

  @Prop({ required: true })
  quantidade: number;
}

export type ProdutoDocument = Produto & Document;
export const ProdutoSchema = SchemaFactory.createForClass(Produto);
