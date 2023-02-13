import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionGroupSchema } from 'src/database/schemas/permission-group.schema';
import { UserSchema } from 'src/database/schemas/user.schema';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'PermissionGroup', schema: PermissionGroupSchema },
    ]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
