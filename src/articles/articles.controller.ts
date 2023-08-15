import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post('create/:userId')
  async create(
    @Param('authorId', ParseIntPipe) userId: number,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return await this.articlesService.create(userId, createArticleDto);
  }

  @Get('get-all/:userId')
  async getAll(@Param('userId', ParseIntPipe) userId: number) {
    const articles = await this.articlesService.getAll(userId);
    return articles.map((article) => article);
  }

  @Get('get-all-drafts/:userId')
  async getAllDrafts(@Param('userId', ParseIntPipe) userId: number) {
    const drafts = await this.articlesService.getAllDrafts(userId);
    return drafts.map((draft) => draft);
  }

  @Get('get-one/:userId/:articleId')
  async getOne(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('articleId', ParseIntPipe) articleId: number,
  ) {
    return await this.articlesService.getOne(userId, articleId);
  }

  @Patch('update/:articleId')
  async update(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articlesService.update(articleId, updateArticleDto);
  }

  @Delete('delete/:articleId')
  async remove(@Param('articleId', ParseIntPipe) articleId: number) {
    return await this.articlesService.remove(articleId);
  }
}

