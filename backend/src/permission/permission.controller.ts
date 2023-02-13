import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  IAddRmPermissionOrGroupDTO,
  IGroupInsertDTO,
} from './permission-request.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('groups')
  async listGroups() {
    return await this.permissionService.listGroups();
  }

  @Get('group/:id')
  async getGroup(@Param('id') id: string) {
    return await this.permissionService.getGroup(id);
  }

  @Post('group')
  async createGroup(@Body() group: IGroupInsertDTO) {
    return await this.permissionService.createGroup(group);
  }

  @Put('group/:id')
  async updateGroup(@Param('id') id: string, @Body() group: IGroupInsertDTO) {
    return await this.permissionService.updateGroup(id, group);
  }

  @Delete('group/:id')
  async deleteGroup(@Param('id') id: string) {
    return await this.permissionService.deleteGroup(id);
  }

  @Put('user/:userId')
  async addPermissionOrGroupInUser(
    @Body() data: IAddRmPermissionOrGroupDTO,
    @Param('userId') userId: string,
  ) {
    return await this.permissionService.addPermissionOrGroupInUser(
      userId,
      data,
    );
  }

  @Delete('user/:userId')
  async rmPermissionOrGroupInUser(
    @Body() data: IAddRmPermissionOrGroupDTO,
    @Param('userId') userId: string,
  ) {
    return await this.permissionService.rmPermissionOrGroupInUser(userId, data);
  }
}
