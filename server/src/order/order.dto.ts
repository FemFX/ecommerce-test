import { EnumOrderItemStatus } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

export class OrderDto {
  @IsEnum(EnumOrderItemStatus)
  status: EnumOrderItemStatus;

  items: OrderItemDto[];
}
export class OrderItemDto {
  @IsNumber()
  quantity: number;
  @IsNumber()
  price: number;
  @IsNumber()
  productId: number;
}
