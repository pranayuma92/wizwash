import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from '../db/models/user.model';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const userExist = await UserModel.query().findOne({ username: createUserDto.username });
    if(userExist) throw new BadRequestException('User alreadey exist');
    createUserDto.password = await hash(createUserDto.password, 10);
    return await UserModel.query().insert(createUserDto);
  }

  async findAll(): Promise<UserModel[]> {
    return await UserModel.query();
  }

  async findOne(id: number): Promise<UserModel> {
    const user = await UserModel.query().findOne({ id });
    if(!user) throw new BadRequestException('User with ID ${id} not found');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserModel> {
    const userExist = await UserModel.query().findOne({ id });
    if(!userExist) throw new BadRequestException('User not exist');
    updateUserDto.password = await hash(updateUserDto.password, 10);
    return await UserModel.query().patchAndFetchById(id, updateUserDto);
  }

  async remove(id: number): Promise<string> {
    const deletedRows = await UserModel.query().deleteById(id);
    if (!deletedRows) throw new BadRequestException(`User with ID ${id} not found`);
    return 'User deleted';
  }
}
