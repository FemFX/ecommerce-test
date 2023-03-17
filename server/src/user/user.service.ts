import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnUserObject } from './return-user.object';
import { Prisma } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUserById(id: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            image: true,
            slug: true,
            category: {
              select: {
                slug: true,
              },
            },
            reviews: true,
          },
        },
        ...selectObject,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (isSameUser && id !== isSameUser.id)
      throw new BadRequestException('Email is already taken');

    const user = await this.getUserById(id);

    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password,
      },
    });
  }

  async toggleFavorites(userId: number, productId: number) {
    const user = await this.getUserById(userId);

    if (!user) throw new NotFoundException('User');

    const isExists = user.favorites.some((product) => product.id === productId);

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: {
            id: productId,
          },
        },
      },
    });
    return 'Success';
  }
}
