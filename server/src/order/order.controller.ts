import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { OrderDto } from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Auth()
  @Get()
  async getAll(@CurrentUser('id') id: number) {
    return this.orderService.getAll(+id);
  }
  @Auth()
  @Post()
  async placeOrder(@CurrentUser('id') userId: number, @Body() dto: OrderDto) {
    return this.orderService.placeOrder(dto, userId);
  }
}
