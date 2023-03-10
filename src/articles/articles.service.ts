import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  /*
  *
  *
 create article
  *
  *
  */
  async create(
    createArticleDto: CreateArticleDto,
    userId: number,
  ): Promise<Article> {
    return await this.prisma.article.create({
      data: {
        ...createArticleDto,
        coverImage: `${process.env.BASE_URL}${createArticleDto.coverImage.path}`,
        userId,
      },
    });
  }

  /*
  *
  *
  get all articles
  *
  *
  */
  async findAll(): Promise<Article[]> {
    return await this.prisma.article.findMany({ include: { author: true } });
  }

  /*
  *
  *
  get a single article
  *
  *
  */
  async findOne(id: number): Promise<Article> {
    return await this.prisma.article.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  /*
  *
  *
  update a single article
  *
  *
  */
  async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });
    return updateArticleDto.coverImage
      ? await this.prisma.article.update({
          where: { id },
          data: {
            ...updateArticleDto,
            coverImage: `${process.env.BASE_URL}${updateArticleDto.coverImage.path}`,
          },
        })
      : await this.prisma.article.update({
          where: { id },
          data: { ...updateArticleDto, coverImage: article.coverImage },
        });
  }

  /*
  *
  *
  remove a single article
  *
  *
  */
  async remove(id: number): Promise<Article> {
    return await this.prisma.article.delete({ where: { id } });
  }
}
