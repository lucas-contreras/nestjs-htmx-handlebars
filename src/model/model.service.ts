import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModelDto } from './dto/create-model.dto';
import { Model } from './entity/model.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private modelsRepository: Repository<Model>,
  ) {}

  async create(createModelDto: CreateModelDto) {
    const model = this.modelsRepository.create(createModelDto);
    return this.modelsRepository.save(model);
  }

  async findAll(): Promise<Model[]> {
    return this.modelsRepository.find();
  }

  async findOne(id: number) {
    return this.modelsRepository.findOneBy({ id });
  }

  async update(id: number, updateModelDto: CreateModelDto) {
    await this.modelsRepository.update(id, updateModelDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.modelsRepository.delete(id);
  }
}
