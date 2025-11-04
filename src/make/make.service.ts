import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMakeDto } from './dto/create-make.dto';
import { Make } from './entity/make.entity';

@Injectable()
export class MakeService {
  constructor(
    @InjectRepository(Make)
    private makesRepository: Repository<Make>,
  ) {}

  async create(createMakeDto: CreateMakeDto) {
    const make = this.makesRepository.create(createMakeDto);
    return this.makesRepository.save(make);
  }

  async findAll() {
    return this.makesRepository.find();
  }

  async findOne(id: number) {
    return this.makesRepository.findOneBy({ id });
  }

  async update(id: number, updateMakeDto: CreateMakeDto) {
    await this.makesRepository.update(id, updateMakeDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.makesRepository.delete(id);
  }
}
