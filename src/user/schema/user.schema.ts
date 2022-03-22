import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true, required: true })
  email: string;

  @Prop({ trim: true, required: true })
  confirmEmail: string;

  @Prop({ trim: true, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
