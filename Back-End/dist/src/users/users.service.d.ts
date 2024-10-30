import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    createUser(username: string, password: string): Promise<User>;
    findByUsername(username: string): Promise<User | undefined>;
    findById(id: number): Promise<User | undefined>;
}
