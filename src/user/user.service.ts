import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByFilter({
      email: createUserDto.email,
    });

    if (existingUser.length > 0) {
      throw new BadRequestException('Email already in use');
    }

    const password = await hash(createUserDto.password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password,
    });

    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findByFilter(filter: FindOptionsWhere<User>) {
    return this.usersRepository.find({ where: filter });
  }

  async changePassword(id: number, oldPass: string, newPass: string) {
    const existingUser = await this.findOne(id);

    if (!existingUser) {
      throw new BadRequestException('User does not exist');
    }

    const isOldPasswordValid = await compare(oldPass, existingUser.password);

    if (!isOldPasswordValid) {
      throw new BadRequestException('Old password does not match');
    }

    const hashedNewPass = await hash(newPass, 10);

    await this.usersRepository.update(id, { password: hashedNewPass });
    return this.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOne(id);

    if (!existingUser) {
      throw new BadRequestException('User does not exist');
    }

    if (!updateUserDto.name) {
      throw new BadRequestException('Name is required for update');
    }

    await this.usersRepository.update(id, { name: updateUserDto.name });
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.usersRepository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
