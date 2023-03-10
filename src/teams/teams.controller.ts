import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamEntity } from './entities/team.entity';
import {
  ApiBearerAuth,
  ApiConsumes,
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
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const filename = `${uniqueSuffix}${extension}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create teams.' })
  @ApiOkResponse({ type: TeamEntity })
  @ApiCreatedResponse({ description: 'Create teams.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(
    @Body() createTeamDto: CreateTeamDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<TeamMember> {
    return this.teamsService.create({ ...createTeamDto, image: files[0] });
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
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const filename = `${uniqueSuffix}${extension}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
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
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<TeamMember> {
    return this.teamsService.update(+id, { ...updateTeamDto, image: files[0] });
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
