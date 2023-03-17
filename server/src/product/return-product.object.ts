import { Prisma } from '@prisma/client';
import { returnCategoryObject } from 'src/category/return-category.objects';
import { returnReviewObject } from 'src/review/return-review.object';

export const productReturnObject: Prisma.ProductSelect = {
  image: true,
  description: true,
  id: true,
  name: true,
  price: true,
  createdAt: true,
  slug: true,
  category: { select: returnCategoryObject },
  reviews: {
    select: returnReviewObject,
  },
};
export const productReturnFullObject: Prisma.ProductSelect = {
  ...productReturnObject,
  // reviews: {
  //   select: returnReviewObject,
  // },
  // category: { select: returnCategoryObject },
};
