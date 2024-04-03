import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.senha = await this.userHash(createUserDto.senha);

    this.userModel.create(createUserDto);
  }

  async update(_id: string, updateData: Partial<CreateUserDto>) {
    try {
      const updateUser = await this.userModel
        .findByIdAndUpdate(_id, updateData, { new: true })
        .exec();

      return updateUser;
    } catch (error) {
      console.log(error);
      throw new Error('Erro ao atualizar usuário.');
    }
  }

  findOne(username: string) {
    const findedUser = this.userModel.findOne({ usuario: username });
    return findedUser;
  }

  findAll() {
    const findedUsers = this.userModel.find().select('-password');
    return findedUsers;
  }

  private async userHash(pass) {
    const saltOrRounds = 10;
    const hashedPass = await bcrypt.hash(pass, saltOrRounds);
    return hashedPass;
  }
}
