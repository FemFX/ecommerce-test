import {
  Controller,
  Get,
  HttpCode,
  Put,
  UsePipes,
  ValidationPipe,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.getUserById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile')
  async updateProfile(@Body() dto: UserDto, @CurrentUser('id') id: number) {
    return this.userService.updateProfile(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Patch('profile/favorites/:productId')
  async toggleFavorites(
    @CurrentUser('id') id: number,
    @Param('productId') productId: string,
  ) {
    return this.userService.toggleFavorites(id, +productId);
  }
}
