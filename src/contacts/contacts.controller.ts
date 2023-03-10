import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Contact, Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactEntity } from './entities/contact.entity';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  /*
  *
  *
  create contacts
  *
  *
  */
  @Post()
  @ApiOperation({ summary: 'Create contact.' })
  @ApiOkResponse({ type: ContactEntity })
  @ApiCreatedResponse({ description: 'Create contact.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createContactDto: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(createContactDto);
  }

  /*
  *
  *
  get all contacts
  for an authorized admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Get contacts.' })
  @ApiOkResponse({ type: [ContactEntity] })
  @ApiResponse({ status: 200, description: 'get contacts.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): Promise<Contact[]> {
    return this.contactsService.findAll();
  }

  /*
  *
  *
  get a single contact
  for an authorized admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  @ApiOperation({ summary: 'Get contact.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: ContactEntity })
  @ApiResponse({ status: 200, description: 'get a single contact.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<Contact> {
    return this.contactsService.findOne(+id);
  }

  /*
  *
  *
  delete contact
  for an authorized admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete contact.' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: ContactEntity })
  @ApiResponse({ status: 200, description: 'delete a single contact.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string): Promise<Contact> {
    return this.contactsService.remove(+id);
  }
}
