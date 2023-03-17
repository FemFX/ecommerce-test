import {
  IProduct,
  TypePaginationProducts,
} from "@/src/types/product.interface";
import { FC, useState } from "react";
import ProductItem from "./product-item";
import Heading from "../heading";
import SortDropdown from "./sort-dropdown";
import Button from "../button";
import { EnumProductSort } from "@/src/services/product/product.type";
import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/src/services/product/product.service";

export interface ICatalogProps {
  data: TypePaginationProducts;
  title?: string;
  isPagination?: boolean;
}
const Catalog: FC<ICatalogProps> = ({ title, isPagination = false, data }) => {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState<EnumProductSort>(
    EnumProductSort.NEWEST
  );
  // console.log(page);

  const { data: response, isLoading } = useQuery(
    ["products", sortType, page],
    () =>
      ProductService.getAll({
        page,
        perPage: 4,
        sort: sortType,
      }),
    {
      initialData: data,
      keepPreviousData: true,
    }
  );

  return (
    <section>
      {title && <Heading className="mb-4">{title}</Heading>}
      {isPagination && (
        <SortDropdown sortType={sortType} setSortType={setSortType} />
      )}
      {response.products.length ? (
        <>
          <div className="grid grid-cols-4 gap-10">
            {response.products.map((p) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-16">
            {Array.from({ length: response.length / 4 }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <Button
                  variant={page === pageNumber ? "orange" : "light"}
                  onClick={() => setPage(pageNumber)}
                  className="mx-3"
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>
          {/* {isPagination && (
            <div className="text-center mt-16">
              <Button variant="orange" onClick={() => setPage(page + 1)}>
                Load more
              </Button>
            </div>
          )} */}
        </>
      ) : (
        <div>There are no products</div>
      )}
    </section>
  );
};
export default Catalog;
