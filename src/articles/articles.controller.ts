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
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post(':authorId')
  async create(
    @Param('authorId', ParseIntPipe) authorId: number,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return await this.articlesService.create(authorId, createArticleDto);
  }

  @Get()
  async findAll() {
    const articles = await this.articlesService.findAll();
    return articles.map((article) => article);
  }

  @Get('drafts')
  async findDrafts() {
    const drafts = await this.articlesService.findDrafts();
    return drafts.map((draft) => draft);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return await this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.remove(id);
  }
}

