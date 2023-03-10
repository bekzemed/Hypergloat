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
import { Article, Role } from '@prisma/client';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  /*
  *
  *
  create articles
  for admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Create Article.' })
  @ApiOkResponse({ type: ArticleEntity })
  @ApiCreatedResponse({ description: 'Create article.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    return this.articlesService.create(createArticleDto, req.user.id);
  }

  /*
  *
  *
  get all articles
  *
  *
  */
  @Get()
  @ApiOperation({ summary: 'Get articles.' })
  @ApiOkResponse({ type: [ArticleEntity] })
  @ApiResponse({ status: 200, description: 'get articles.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  /*
  *
  *
  get a single article
  *
  *
  */
  @Get(':id')
  @ApiOperation({ summary: 'Get article.' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: ArticleEntity })
  @ApiResponse({ status: 200, description: 'get a single article.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(+id);
  }

  /*
  *
  *
  update article
  for an authorized admin and editor only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  @ApiOperation({ summary: 'Update article.' })
  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: ArticleEntity })
  @ApiResponse({ status: 200, description: 'update a single article.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articlesService.update(+id, updateArticleDto);
  }

  /*
  *
  *
  delete article
  for an authorized admin only
  *
  *
  */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete article.' })
  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter unique id',
    required: true,
  })
  @ApiOkResponse({ type: ArticleEntity })
  @ApiResponse({ status: 200, description: 'delete a single article.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string): Promise<Article> {
    return this.articlesService.remove(+id);
  }
}
