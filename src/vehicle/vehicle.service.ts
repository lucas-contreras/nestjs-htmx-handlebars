import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './entity/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Make } from 'src/make/entity/make.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async create(dto: CreateVehicleDto): Promise<Vehicle> {
    const entity = this.vehicleRepository.create({
      ...dto,
      make: { id: dto.makeId } as Make,
    });

    return this.vehicleRepository.save(entity);
  }

  findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({ relations: ['make'] });
  }

  async findOne(id: number): Promise<Vehicle> {
    const found = await this.vehicleRepository.findOne({
      where: { id },
      relations: ['make'],
    });

    if (!found) {
      throw new NotFoundException('Vehicle not found');
    }

    return found;
  }

  async update(id: number, dto: CreateVehicleDto): Promise<Vehicle> {
    const entity: Vehicle = {
      id,
      color: dto.color,
      mileage: dto.mileage,
      model: dto.model,
      year: dto.year,
      make: { id: dto.makeId } as Make,
      available: dto.available,
    };

    const preloaded = await this.vehicleRepository.preload(entity);

    if (!preloaded) {
      throw new NotFoundException('Vehicle not found');
    }

    return this.vehicleRepository.save(preloaded);
  }

  async remove(id: number): Promise<void> {
    const res = await this.vehicleRepository.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException('Vehicle not found');
    }
  }
}
