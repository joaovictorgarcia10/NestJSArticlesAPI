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
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Article } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post('create/:userId')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Article })
  async create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    return await this.articlesService.create(userId, createArticleDto);
  }

  @Get('get-all/:userId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Article, isArray: true })
  async getAll(@Param('userId', ParseIntPipe) userId: number): Promise<Article[]> {
    const articles = await this.articlesService.getAll(userId);
    return articles.map((article) => article);
  }

  @Get('get-all-drafts/:userId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Article, isArray: true })
  async getAllDrafts(@Param('userId', ParseIntPipe) userId: number): Promise<Article[]> {
    const drafts = await this.articlesService.getAllDrafts(userId);
    return drafts.map((draft) => draft);
  }

  @Get('get-one/:userId/:articleId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Article })
  async getOne(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('articleId', ParseIntPipe) articleId: number,
  ): Promise<Article> {
    return await this.articlesService.getOne(userId, articleId);
  }

  @Patch('update/:articleId')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: Article })
  async update(
    @Param('articleId', ParseIntPipe) articleId: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return await this.articlesService.update(articleId, updateArticleDto);
  }

  @Delete('delete/:articleId')
  @ApiBearerAuth()
  @ApiOkResponse({ type: Article })
  async remove(@Param('articleId', ParseIntPipe) articleId: number): Promise<Article> {
    return await this.articlesService.remove(articleId);
  }
}

