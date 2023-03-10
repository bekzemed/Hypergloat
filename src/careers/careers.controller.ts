import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { Career, Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CareersService } from './careers.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { CareerEntity } from './entities/career.entity';

@ApiTags('Careers')
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  /*
  *
  *
  create career
  for admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create career.' })
  @ApiOkResponse({ type: CareerEntity })
  @ApiCreatedResponse({ description: 'Create career.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createCareerDto: CreateCareerDto): Promise<Career> {
    return this.careersService.create(createCareerDto);
  }

  /*
  *
  *
  get all careers
  *
  *
  */
  @Get()
  @ApiOperation({ summary: 'Get careers.' })
  @ApiOkResponse({ type: [CareerEntity] })
  @ApiResponse({ status: 200, description: 'get careers.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): Promise<Career[]> {
    return this.careersService.findAll();
  }

  /*
  *
  *
  get a single career
  *
  *
  */
  @Get(':id')
  @ApiOperation({ summary: 'Get career.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: CareerEntity })
  @ApiResponse({ status: 200, description: 'get a single career.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<Career> {
    return this.careersService.findOne(+id);
  }

  /*
  *
  *
  update careers
  for an authorized admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update careers.' })
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: CareerEntity })
  @ApiResponse({ status: 200, description: 'update a single careers.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updateCareerDto: UpdateCareerDto,
  ): Promise<Career> {
    return this.careersService.update(+id, updateCareerDto);
  }

  /*
  *
  *
  delete careers
  for admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete career.' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: CareerEntity })
  @ApiResponse({ status: 200, description: 'delete a single career.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string): Promise<Career> {
    return this.careersService.remove(+id);
  }
}
