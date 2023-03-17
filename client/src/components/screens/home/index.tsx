import { FC } from "react";
import Meta from "../../meta";
import Catalog from "../../ui/catalog";
import { TypePaginationProducts } from "@/src/types/product.interface";
import { useAuth } from "@/src/hooks/useAuth";
import { useActions } from "@/src/hooks/useActions";
import Layout from "../../ui/layout";

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
  const { user } = useAuth();
  const { logout } = useActions();
  return (
    <Meta title="Home">
      <Layout>
        {!!user && <button onClick={() => logout()}>logout</button>}
        <Catalog
          title="products"
          data={{
            length,
            products,
          }}
          isPagination
        />
      </Layout>
    </Meta>
  );
};
export default Home;
