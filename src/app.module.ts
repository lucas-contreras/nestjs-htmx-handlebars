import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleController } from './vehicle/vehicle.controller';
import { VehicleModule } from './vehicle/vehicle.module';
import { ModelModule } from './model/model.module';
import typeOrmConfig from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), VehicleModule, ModelModule],
  controllers: [AppController, VehicleController],
  providers: [AppService],
})
export class AppModule {}
