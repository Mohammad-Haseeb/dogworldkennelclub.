import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { use } from "passport";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async login(loginUserDto: LoginUserDto) {
    console.log(loginUserDto.username);
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.username,
        password: loginUserDto.password,
      },
    });
    console.log("users : ", user);
    return { user, access: user.id, refresh: user.id };
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const alreadyExists = await this.findOne(createUserDto.email);
      if (alreadyExists) {
        throw new HttpException("email already exist", HttpStatus.BAD_REQUEST);
      }
      const created = await this.userRepository.create(createUserDto);
      const saved = await this.userRepository.save(created);
      delete saved["password"];
      return saved;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(email: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      if (!user) {
        throw new NotFoundException("Not found");
      }
      delete user["password"];
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  generatePassword(password: string) {}
}
