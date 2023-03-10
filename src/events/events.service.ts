import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  /*
  *
  *
 create event
  *
  *
  */
  async create(createEventDto: CreateEventDto): Promise<Event> {
    return await this.prisma.event.create({
      data: { ...createEventDto, date: new Date(createEventDto.date) },
    });
  }

  /*
  *
  *
  get all events
  *
  *
  */
  async findAll(): Promise<Event[]> {
    return await this.prisma.event.findMany();
  }

  /*
  *
  *
  get a single event
  *
  *
  */
  async findOne(id: number): Promise<Event> {
    return await this.prisma.event.findUnique({
      where: { id },
    });
  }

  /*
  *
  *
  update a single event
  *
  *
  */
  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    return await this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  /*
  *
  *
  remove a single event
  *
  *
  */
  async remove(id: number): Promise<Event> {
    return await this.prisma.event.delete({ where: { id } });
  }
}
