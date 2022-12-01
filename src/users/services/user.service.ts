import { IUserEntity } from '../entities/user.entity';
import { UserDto } from './dto/userinput.dto';
import bcrypt from 'bcryptjs';
import { PartialUserDto } from './dto/partialUserInput.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export class UserService {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    password: true,
    role: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: UserDto): Promise<IUserEntity | void> {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    const data: UserDto = {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role,
    };
    return this.prisma.user.create({ data, select: this.userSelect });
  }

  async findAllUsers(user: UserDto[]): Promise<IUserEntity[] | void> {
    return this.prisma.user.findMany({ select: { ...this.userSelect } });
  }

  async verifyIdAndReturnUser(id: string): Promise<IUserEntity | void> {
    const user: IUserEntity = await this.prisma.user.findUnique({where:{id}, select: this.userSelect})

    if(!user){
        throw new NotFoundException(`Entrada de id ${id} não encontrada`)
    }

    return user;
  }
}
