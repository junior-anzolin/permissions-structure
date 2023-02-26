import { BadRequestException, Injectable } from '@nestjs/common';
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
    return await this.userModel
      .findById(id)
      .populate('permissions.groups')
      .exec();
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

  async update(id: string, user: IUserInsertDTO) {
    const userRegister = await this.get(id);
    if (!userRegister) throw new BadRequestException('Usuário não encontrado');

    return await this.userModel.findByIdAndUpdate(id, user);
  }
}
