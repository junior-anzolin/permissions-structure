import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionGroupDocument = PermissionGroup & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class PermissionGroup {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  rules: string[];
}

export const PermissionGroupSchema =
  SchemaFactory.createForClass(PermissionGroup);
PermissionGroupSchema.index({ '$**': 'text' });
