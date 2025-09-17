import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Explicit driver. If you need other drivers, add a controlled mapping here.
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true, // only for development!
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
