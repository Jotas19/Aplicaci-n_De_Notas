import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET_KEY', // Usa la misma clave que en el módulo de JWT
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.findById(payload.sub); // Asegúrate de que este método exista
        return { id: user.id, username: user.username }; // Retorna el id y el nombre de usuario
    }
}
