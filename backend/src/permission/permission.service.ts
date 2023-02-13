import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionGroupDocument } from 'src/database/schemas/permission-group.schema';
import { UserDocument } from 'src/database/schemas/user.schema';
import {
  IAddRmPermissionOrGroupDTO,
  IGroupInsertDTO,
} from './permission-request.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel('PermissionGroup')
    private permissionGroupModel: Model<PermissionGroupDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {}

  async listGroups() {
    return await this.permissionGroupModel.find();
  }

  async getGroup(id: string) {
    return await this.permissionGroupModel.findById(id);
  }

  async createGroup(group: IGroupInsertDTO) {
    const { description, rules } = group;

    return await this.permissionGroupModel.create({ description, rules });
  }

  async updateGroup(id: string, group: IGroupInsertDTO) {
    const { description, rules } = group;

    return await this.permissionGroupModel.findByIdAndUpdate(id, {
      description,
      rules,
    });
  }

  async deleteGroup(id: string) {
    return await this.permissionGroupModel.findByIdAndDelete(id);
  }

  async addPermissionOrGroupInUser(
    userId: string,
    data: IAddRmPermissionOrGroupDTO,
  ) {
    const { permission, group } = data;
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('NOT_FOUND');
    }

    const { permissions: permissionsUser } = user;

    if (permission && !permissionsUser.rules.includes(permission)) {
      await this.userModel.findByIdAndUpdate(userId, {
        $push: {
          'permissions.rules': permission,
        },
      });
    }

    if (group) {
      const groupRes = await this.getGroup(group);
      if (groupRes && !permissionsUser.groups.includes(groupRes.id)) {
        await this.userModel.findByIdAndUpdate(userId, {
          $push: {
            'permissions.groups': groupRes.id,
          },
        });
      }
    }

    return await await this.userModel.findById(userId);
  }

  async rmPermissionOrGroupInUser(
    userId: string,
    data: IAddRmPermissionOrGroupDTO,
  ) {
    const { permission, group } = data;

    if (permission) {
      await this.userModel.findByIdAndUpdate(userId, {
        $pull: {
          'permissions.rules': permission,
        },
      });
    }

    if (group) {
      const groupRes = await this.getGroup(group);
      if (groupRes) {
        await this.userModel.findByIdAndUpdate(userId, {
          $pull: {
            'permissions.groups': groupRes.id,
          },
        });
      }
    }

    return await this.userModel.findById(userId);
  }
}
