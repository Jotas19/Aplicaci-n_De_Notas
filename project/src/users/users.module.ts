// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Importa TypeOrmModule
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],  // Exporta UsersService para uso en otros módulos
})
export class UsersModule {}
