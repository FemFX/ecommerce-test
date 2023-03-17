import { IProduct } from "@/src/types/product.interface";
import Image from "next/image";
import { FC } from "react";
import AddToCartButton from "./AddToCartButton";
import FavoriteButton from "./FavoriteButton";
import ProductRating from "./ProductRating";
import dynamic from "next/dynamic";
import Link from "next/link";
import { convertPrice } from "@/src/utils/convert-price";

export interface IProductItemProps {
  product: IProduct;
}

const DynamicFavoriteButton = dynamic(() => import("./FavoriteButton"), {
  ssr: false,
});

const ProductItem: FC<IProductItemProps> = ({ product }) => {
  return (
    <div>
      <div className="bg-white rounded-xl relative">
        <div className="absolute top-2 right-2 z-1">
          <DynamicFavoriteButton productId={product.id} />
          <AddToCartButton product={product} />
        </div>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            width={300}
            height={300}
            alt={product.name}
          />
        </Link>
      </div>
      <Link href={`/product/${product.slug}`}>
        <h3 className="my-2 font-semibold ">{product.name}</h3>
      </Link>

      <Link
        href={`/category/${product.category.slug}`}
        className="text-aqua text-xs mb-2"
      >
        {product.category.name}
      </Link>

      <ProductRating product={product} />
      <div className="text-2xl font-semibold">
        {convertPrice(product.price)}
      </div>
    </div>
  );
};
export default ProductItem;
