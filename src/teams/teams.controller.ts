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
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamEntity } from './entities/team.entity';
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
import { Role, TeamMember } from '@prisma/client';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  /*
  *
  *
  create teams
  for admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create teams.' })
  @ApiOkResponse({ type: TeamEntity })
  @ApiCreatedResponse({ description: 'Create teams.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createTeamDto: CreateTeamDto): Promise<TeamMember> {
    return this.teamsService.create(createTeamDto);
  }

  /*
  *
  *
  get all teams
  *
  *
  */
  @Get()
  @ApiOperation({ summary: 'Get teams.' })
  @ApiOkResponse({ type: [TeamEntity] })
  @ApiResponse({ status: 200, description: 'get teams.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): Promise<TeamMember[]> {
    return this.teamsService.findAll();
  }

  /*
  *
  *
  get a single team
  *
  *
  */
  @Get(':id')
  @ApiOperation({ summary: 'Get team.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: TeamEntity })
  @ApiResponse({ status: 200, description: 'get a single team.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<TeamMember> {
    return this.teamsService.findOne(+id);
  }

  /*
  *
  *
  update teams
  for an authorized admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update teams.' })
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: TeamEntity })
  @ApiResponse({ status: 200, description: 'update a single teams.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<TeamMember> {
    return this.teamsService.update(+id, updateTeamDto);
  }

  /*
  *
  *
  delete teams
  for admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete team.' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: TeamEntity })
  @ApiResponse({ status: 200, description: 'delete a single team.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string): Promise<TeamMember> {
    return this.teamsService.remove(+id);
  }
}
