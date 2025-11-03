import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { ModelModule } from './make/make.module';
import typeOrmConfig from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ModelModule, VehicleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
