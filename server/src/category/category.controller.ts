import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll() {
    return this.categoryService.getAll();
  }
  @Get('by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.categoryService.getCategoryBySlug(slug);
  }
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getCategoryById(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(@Body() dto: CategoryDto, @Param('id') id: string) {
    return this.categoryService.update(+id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put()
  async create() {
    return this.categoryService.create();
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(+id);
  }
}
