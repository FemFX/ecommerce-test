import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OrderDto } from './order.dto';
import { productReturnObject } from 'src/product/return-product.object';
import * as YooKassa from "yookassa";

const yooKassa = new YooKassa({
    shopId:process.env['SHOP_ID'],
    secretKey : process.env['PAYMENT_TOKEN']
})

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(userId: number) {
    return this.prismaService.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            product: {
              select: productReturnObject,
            },
          },
        },
      },
    });
  }

  async placeOrder(dto: OrderDto, userId: number) {
    const order = await this.prismaService.order.create({
      data: {
        status: dto.status,
        items: {
          create: dto.items,
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return order;
  }
}
