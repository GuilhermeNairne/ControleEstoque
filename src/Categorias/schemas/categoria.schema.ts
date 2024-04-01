import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Categoria {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: false })
  idsProdutos: string[];

  @Prop({ required: false })
  idCategoriaAntiga: string;
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);
