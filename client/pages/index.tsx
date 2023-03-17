import Home from "@/src/components/screens/home";
import { ProductService } from "@/src/services/product/product.service";
import {
  TypePaginationProducts,
  TypeProducts,
} from "@/src/types/product.interface";
import { GetStaticProps, NextPage } from "next";

const Homepage: NextPage<TypePaginationProducts> = ({ products, length }) => {
  return <Home products={products} length={length} />;
};
export const getStaticProps: GetStaticProps<
  TypePaginationProducts
> = async () => {
  const data = await ProductService.getAll({
    page: 1,
    perPage: 4,
  });

  return {
    props: data,
  };
};

export default Homepage;
