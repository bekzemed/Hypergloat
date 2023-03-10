import { Injectable } from '@nestjs/common';
import { TeamMember } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  /*
  *
  *
 create team
  *
  *
  */
  async create(createTeamDto: CreateTeamDto): Promise<TeamMember> {
    return await this.prisma.teamMember.create({
      data: createTeamDto,
    });
  }

  /*
  *
  *
  get all teams
  *
  *
  */
  async findAll(): Promise<TeamMember[]> {
    return await this.prisma.teamMember.findMany();
  }

  /*
  *
  *
  get a single team
  *
  *
  */
  async findOne(id: number): Promise<TeamMember> {
    return await this.prisma.teamMember.findUnique({
      where: { id },
    });
  }

  /*
  *
  *
  update a single team
  *
  *
  */
  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<TeamMember> {
    return await this.prisma.teamMember.update({
      where: { id },
      data: updateTeamDto,
    });
  }

  /*
  *
  *
  remove a single team
  *
  *
  */
  async remove(id: number): Promise<TeamMember> {
    return await this.prisma.teamMember.delete({ where: { id } });
  }
}
