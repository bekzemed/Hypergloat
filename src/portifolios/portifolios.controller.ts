import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PortifoliosService } from './portifolios.service';
import { CreatePortifolioDto } from './dto/create-portifolio.dto';
import { UpdatePortifolioDto } from './dto/update-portifolio.dto';
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
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Portifolio, Role } from '@prisma/client';
import { PortifolioEntity } from './entities/portifolio.entity';

@ApiTags('Portifolios')
@Controller('portifolios')
export class PortifoliosController {
  constructor(private readonly portifoliosService: PortifoliosService) {}

  /*
  *
  *
  create portifolios
  for all the roles
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @Post()
  @ApiOperation({ summary: 'Create Portifolio.' })
  @ApiOkResponse({ type: PortifolioEntity })
  @ApiCreatedResponse({ description: 'Create portifolio.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createPortifolioDto: CreatePortifolioDto, @Request() req) {
    return this.portifoliosService.create(createPortifolioDto, req.user.id);
  }

  /*
  *
  *
  get all portifolios
  *
  *
  */
  @Get()
  @ApiOperation({ summary: 'Get portifolios.' })
  @ApiOkResponse({ type: [PortifolioEntity] })
  @ApiResponse({ status: 200, description: 'get portifolios.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): Promise<Portifolio[]> {
    return this.portifoliosService.findAll();
  }

  /*
  *
  *
  get a single portifolio
  *
  *
  */
  @Get(':id')
  @ApiOperation({ summary: 'Get portifolio.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: PortifolioEntity })
  @ApiResponse({ status: 200, description: 'get a single portifolio.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<Portifolio> {
    return this.portifoliosService.findOne(+id);
  }

  /*
  *
  *
  update portifolio
  for an authorized admin and editor only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiOperation({ summary: 'Update portifolio.' })
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: PortifolioEntity })
  @ApiResponse({ status: 200, description: 'update a single portifolio.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updatePortifolioDto: UpdatePortifolioDto,
  ): Promise<Portifolio> {
    return this.portifoliosService.update(+id, updatePortifolioDto);
  }

  /*
  *
  *
  delete portifolios
  for an authorized user
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiOperation({ summary: 'Delete portifolio.' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: PortifolioEntity })
  @ApiResponse({ status: 200, description: 'delete a single portifolio.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string): Promise<Portifolio> {
    return this.portifoliosService.remove(+id);
  }
}
