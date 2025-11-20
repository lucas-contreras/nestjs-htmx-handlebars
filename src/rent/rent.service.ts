import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rent } from './entities/rent.entity';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>,
  ) {}

  create(createRentDto: CreateRentDto) {
    const rent = this.rentRepository.create(createRentDto);
    return this.rentRepository.save(rent);
  }

  findAll() {
    return this.rentRepository.find();
  }

  findOne(id: number) {
    return this.rentRepository.findOneBy({ id });
  }

  async update(id: number, updateRentDto: UpdateRentDto) {
    const rent = await this.findOne(id);
    if (!rent) {
      throw new NotFoundException('Rent not found');
    }
    await this.rentRepository.update(id, updateRentDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const res = await this.rentRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException('Rent not found');
    }
    return true;
  }
}
