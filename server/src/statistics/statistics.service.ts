import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async getMain(userId: number) {
    const user = await this.userService.getUserById(userId, {
      orders: {
        select: {
          items: true,
        },
      },
      reviews: true,
    });
    //!!!
    // for (let order in user.orders) {
    //   let total = 0;
    // }

    return [
      {
        name: 'Orders',
        value: user.orders.length,
      },
      {
        name: 'Reviews',
        value: user.reviews.length,
      },
      {
        name: 'FAvorites',
        value: user.favorites.length,
      },
      {
        name: 'Total amount',
        value: user.orders.length,
      },
    ];
  }
}
