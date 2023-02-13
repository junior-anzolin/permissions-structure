import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type PermissionDocument = Permissions & Document;

@Schema({ _id: false, id: false })
export class Permissions {
  @Prop({ default: [], type: [Types.ObjectId], ref: 'PermissionGroup' })
  groups: Types.ObjectId[];

  @Prop({ default: [] })
  rules: string[];
}
