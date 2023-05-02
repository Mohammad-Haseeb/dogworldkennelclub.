"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login(loginUserDto) {
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
    async create(createUserDto) {
        try {
            const alreadyExists = await this.findOne(createUserDto.email);
            if (alreadyExists) {
                throw new common_1.HttpException("email already exist", common_1.HttpStatus.BAD_REQUEST);
            }
            const created = await this.userRepository.create(createUserDto);
            const saved = await this.userRepository.save(created);
            delete saved["password"];
            return saved;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    findAll() {
        return this.userRepository.find();
    }
    async findOne(email) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: email },
            });
            if (!user) {
                throw new common_1.NotFoundException("Not found");
            }
            delete user["password"];
            return user;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    async findByUsername(username) {
        const user = await this.userRepository.findOne({
            where: {
                username,
            },
        });
        return user;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    generatePassword(password) { }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map