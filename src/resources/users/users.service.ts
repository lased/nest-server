import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepo.findOne({
      where: { username: createUserDto.username },
    });

    if (user) {
      throw new ConflictException('User exists');
    }

    createUserDto.password = await hash(createUserDto.password, 10);

    return this.usersRepo.save(createUserDto);
  }

  findAll() {
    return this.usersRepo.find();
  }

  findByName(username: string) {
    return this.usersRepo.findOne({ where: { username } });
  }

  findById(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.password = await hash(updateUserDto.password, 10);

    return this.usersRepo.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepo.delete(id);
  }
}
