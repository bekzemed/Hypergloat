import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /*
  *
  *
 create a user
  *
  *
  */
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: createUserDto });
  }

  /*
  *
  *
  get all users
  *
  *
  */
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  /*
  *
  *
  get a single user
  *
  *
  */
  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  /*
  *
  *
  get a single user by email
  *
  *
  */
  async findOneByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  /*
  *
  *
  update a single user
  *
  *
  */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  /*
  *
  *
  remove a single user
  *
  *
  */
  async remove(id: number): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
