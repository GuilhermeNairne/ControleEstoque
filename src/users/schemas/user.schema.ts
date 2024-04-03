import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  usuario: string;

  @Prop({ required: true })
  senha: string;

  @Prop({ required: true })
  funcao: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  urlImage: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
