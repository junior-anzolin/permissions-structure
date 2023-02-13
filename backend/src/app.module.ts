import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PermissionModule } from './permission/permission.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, PermissionModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
