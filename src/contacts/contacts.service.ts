import { Injectable } from '@nestjs/common';
import { Contact } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  /*
  *
  *
 create contact
  *
  *
  */
  async create(createContactDto: CreateContactDto): Promise<Contact> {
    return await this.prisma.contact.create({
      data: createContactDto,
    });
  }

  /*
  *
  *
  get all contacts
  *
  *
  */
  async findAll(): Promise<Contact[]> {
    return await this.prisma.contact.findMany();
  }

  /*
  *
  *
  get a single contact
  *
  *
  */
  async findOne(id: number): Promise<Contact> {
    return await this.prisma.contact.findUnique({
      where: { id },
    });
  }

  /*
  *
  *
  remove a single contact
  *
  *
  */
  async remove(id: number): Promise<Contact> {
    return await this.prisma.contact.delete({ where: { id } });
  }
}
