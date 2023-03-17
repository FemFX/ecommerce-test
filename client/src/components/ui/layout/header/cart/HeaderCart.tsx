import { useCart } from "@/src/hooks/useCart";
import { useOutside } from "@/src/hooks/useOutside";
import { PaymentService } from "@/src/services/payment.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import SquareButton from "../../../square-button";
import cn from "clsx";
import styles from "./Cart.module.scss";
import { convertPrice } from "@/src/utils/convert-price";
import Button from "../../../button";
import CartItem from "./cart-item";

export interface IHeaderCartProps {}
const HeaderCart: FC<IHeaderCartProps> = ({}) => {
  const { isShow, setIsShow, ref } = useOutside(false);
  const { items, total } = useCart();

  const { push } = useRouter();

  // const {mutate} = useMutation(['create payment'], () => PaymentService.createPayment(total), {
  //     onSuccess(data){
  //         push(data.confirmation.confirmation_url)
  //     }
  // })

  return (
    <div
      className="relative"
      ref={ref}
    >
      <RiShoppingCartFill
      size={30}
        onClick={() => {
          setIsShow(!isShow);
        }}
      />
      {/* <SquareButton
        Icon={RiShoppingCartFill}
        onClick={() => {
          setIsShow(!isShow);
        }}
        number={items.length}
      /> */}
      <div
        className={cn(
          "absolute top-[4.2rem] w-80 -left-[12.5rem] bg-secondary rounded-xl px-5 py-3 text-sm menu z-20 text-white",
          isShow ? "open-menu" : "close-menu"
        )}
      >
        <div className="font-normal text-lg mb-5">My cart</div>
        <div className={styles.cart}>
          {items.length ? (
            items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <div className="font-light">Cart is empty</div>
          )}
        </div>
        <div className={styles.footer}>
          <div>Total:</div>
          <div>{convertPrice(total)}</div>
        </div>
        <div className="text-center">
          <Button variant="light" className="btn-link mt-5 mb-2">
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};
export default HeaderCart;
