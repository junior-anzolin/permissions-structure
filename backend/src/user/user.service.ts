import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/database/schemas/user.schema';
import { IUserInsertDTO } from './user-request.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async list() {
    return await this.userModel.find();
  }

  async get(id) {
    return await this.userModel.findById(id);
  }

  async create(user: IUserInsertDTO) {
    const { name, email } = user;

    return await this.userModel.create({
      name,
      email,
      permissions: {
        rules: [],
        groups: [],
      },
    });
  }
}
