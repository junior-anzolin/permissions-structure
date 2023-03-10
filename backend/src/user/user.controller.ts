import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { IUserInsertDTO } from './user-request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list() {
    return await this.userService.list();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return await this.userService.get(id);
  }

  @Post()
  async create(@Body() user: IUserInsertDTO) {
    return await this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: IUserInsertDTO) {
    return await this.userService.update(id, user);
  }
}
