import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';


//TODO: винести TypeOrmModule в окремий файл
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User],
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
