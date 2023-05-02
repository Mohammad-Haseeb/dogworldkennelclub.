import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    login(loginUserDto: LoginUserDto): Promise<{
        user: User;
        access: number;
        refresh: number;
    }>;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(email: string): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    findByUsername(username: string): Promise<User>;
    remove(id: number): string;
    generatePassword(password: string): void;
}
