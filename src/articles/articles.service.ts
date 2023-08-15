import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Article } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId: number, createArticleDto: CreateArticleDto): Promise<Article> {
    const data = {
      ...createArticleDto,
      authorId: userId,
    }

    return this.prisma.article.create({ data: data });
  }

  async getAll(userId: number): Promise<Article[]> {
    return this.prisma.article.findMany({
      where: { published: true , authorId: userId},
      include: { author: true },
    });
  }

  async getAllDrafts(userId: number): Promise<Article[]> {
    return this.prisma.article.findMany({
      where: { published: false, authorId: userId },
      include: { author: true },
    });
  }

  getOne(userId: number, id: number): Promise<Article> {
    return this.prisma.article.findUnique({
      where: {  id, authorId: userId },
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
