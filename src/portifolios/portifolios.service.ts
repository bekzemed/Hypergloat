import { Injectable } from '@nestjs/common';
import { Portifolio } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePortifolioDto } from './dto/create-portifolio.dto';
import { UpdatePortifolioDto } from './dto/update-portifolio.dto';

@Injectable()
export class PortifoliosService {
  constructor(private prisma: PrismaService) {}

  /*
  *
  *
 create portifolio
  *
  *
  */
  async create(
    createPortifolioDto: CreatePortifolioDto,
    userId: number,
  ): Promise<Portifolio> {
    return await this.prisma.portifolio.create({
      data: { ...createPortifolioDto, userId },
    });
  }

  /*
  *
  *
  get all portifolios
  *
  *
  */
  async findAll(): Promise<Portifolio[]> {
    return await this.prisma.portifolio.findMany({ include: { user: true } });
  }

  /*
  *
  *
  get a single portifolio
  *
  *
  */
  async findOne(id: number): Promise<Portifolio> {
    return await this.prisma.portifolio.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  /*
  *
  *
  update a single portifolio
  *
  *
  */
  async update(
    id: number,
    updatePortifolioDto: UpdatePortifolioDto,
  ): Promise<Portifolio> {
    return await this.prisma.portifolio.update({
      where: { id },
      data: updatePortifolioDto,
    });
  }

  /*
  *
  *
  remove a single portifolio
  *
  *
  */
  async remove(id: number): Promise<Portifolio> {
    return await this.prisma.portifolio.delete({ where: { id } });
  }
}
