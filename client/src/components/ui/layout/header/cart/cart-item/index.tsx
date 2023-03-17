import { ICartItem } from "@/src/types/cart.interface";
import { FC } from "react";
import styles from "../Cart.module.scss";
import Image from "next/image";
import { convertPrice } from "@/src/utils/convert-price";
import CartActions from "./cart-actions";

export interface ICartItemProps {
  item: ICartItem;
}
const CartItem: FC<ICartItemProps> = ({ item }) => {
  return (
    <div className={styles.item}>
      <Image
        src={item.product.image}
        width={100}
        height={100}
        alt={item.product.name}
      />
      <div>
        <div className={styles.name}>{item.product.name}</div>
        <div className={styles.price}>{convertPrice(item.price)}</div>

        <CartActions item={item} />
      </div>
    </div>
  );
};
export default CartItem;
