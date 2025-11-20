import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { VehicleModule } from './vehicle/vehicle.module';
import { ModelModule } from './make/make.module';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerViewController } from './customer/customer-view.controller';
import { RentModule } from './rent/rent.module';
import typeOrmConfig from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ModelModule,
    VehicleModule,
    UserModule,
    CustomerModule,
    RentModule,
  ],
  controllers: [CustomerViewController],
  providers: [AppService],
})
export class AppModule {}
