import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnReviewObject } from './return-review.object';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll() {
    return this.prismaService.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: returnReviewObject,
    });
  }

  async getReviewById(id: number) {
    const review = await this.prismaService.review.findUnique({
      where: {
        id,
      },
      select: returnReviewObject,
    });
    if (!review) {
      throw new NotFoundException('review not found');
    }
    return review;
  }
  async delete(id: number) {
    return this.prismaService.review.delete({
      where: {
        id,
      },
    });
  }
  async create(userId: number, dto: ReviewDto, productId: number) {
    return this.prismaService.review.create({
      data: {
        ...dto,
        product: {
          connect: {
            id: productId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  async getAverageValueByProductId(productId: number) {
    return this.prismaService.review
      .aggregate({
        where: { productId },
        _avg: { rating: true },
      })
      .then((data) => data._avg);
  }

}
