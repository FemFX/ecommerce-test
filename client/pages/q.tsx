import Meta from "@/src/components/meta";
import Catalog from "@/src/components/ui/catalog";
import Layout from "@/src/components/ui/layout";
import { ProductService } from "@/src/services/product/product.service";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";

const SearchPage: NextPage = () => {
  const { query } = useRouter();

  const { data } = useQuery(["search products", query.term], () =>
    ProductService.getAll({
      searchTerm: query.term as string,
    })
  );
  return (
    <Meta title="Поиск">
      <Layout>
        <Catalog
          title={`Поиск по запросу "${query.term || ""}"`}
          data={{
            products: data?.products || [],
            length: data?.products.length || 0,
          }}
        />
      </Layout>
    </Meta>
  );
};
export default SearchPage;
