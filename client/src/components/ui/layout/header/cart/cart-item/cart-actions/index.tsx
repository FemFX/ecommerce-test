import { ICartItem } from "@/src/types/cart.interface";
import { FC } from "react";

export interface ICartActionsProps {
  item: ICartItem;
}
const CartActions: FC<ICartActionsProps> = ({ item }) => {
  return <div>actions</div>;
};
export default CartActions;
