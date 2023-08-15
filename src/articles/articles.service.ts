import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(authorId: number, createArticleDto: CreateArticleDto): Promise<Article> {
    const data = {
      ...createArticleDto,
      authorId: authorId,
    }

    return this.prisma.article.create({ data: data });
  }

  async findDrafts(): Promise<Article[]> {
    return this.prisma.article.findMany({
      where: { published: false },
      include: { author: true },
    });
  }

  async findAll(): Promise<Article[]> {
    return this.prisma.article.findMany({
      where: { published: true },
      include: { author: true },
    });
  }

  findOne(id: number): Promise<Article> {
    return this.prisma.article.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: number): Promise<Article> {
    return this.prisma.article.delete({ where: { id } });
  }
}
