import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Make } from './entity/make.entity';
import { MakeController } from './make.controller';
import { MakeService } from './make.service';

@Module({
  imports: [TypeOrmModule.forFeature([Make])],
  controllers: [MakeController],
  providers: [MakeService],
  exports: [MakeService],
})
export class ModelModule {}
