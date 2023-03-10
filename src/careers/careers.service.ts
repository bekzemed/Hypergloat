import { Injectable } from '@nestjs/common';
import { Career } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';

@Injectable()
export class CareersService {
  constructor(private prisma: PrismaService) {}

  /*
  *
  *
 create career
  *
  *
  */
  async create(createCareerDto: CreateCareerDto): Promise<Career> {
    return await this.prisma.career.create({
      data: createCareerDto,
    });
  }

  /*
  *
  *
  get all careers
  *
  *
  */
  async findAll(): Promise<Career[]> {
    return await this.prisma.career.findMany();
  }

  /*
  *
  *
  get a single career
  *
  *
  */
  async findOne(id: number): Promise<Career> {
    return await this.prisma.career.findUnique({
      where: { id },
    });
  }

  /*
  *
  *
  update a single career
  *
  *
  */
  async update(id: number, updateCareerDto: UpdateCareerDto): Promise<Career> {
    return await this.prisma.career.update({
      where: { id },
      data: updateCareerDto,
    });
  }

  /*
  *
  *
  remove a single career
  *
  *
  */
  async remove(id: number): Promise<Career> {
    return await this.prisma.career.delete({ where: { id } });
  }
}
