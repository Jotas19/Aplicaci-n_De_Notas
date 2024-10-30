// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller'; // Asegúrate de que esto esté aquí
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // Usa una clave segura en producción
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController], // Asegúrate de que el controlador esté registrado aquí
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}