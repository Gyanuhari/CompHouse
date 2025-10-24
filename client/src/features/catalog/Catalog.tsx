import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogApi";

export default function Catalog() {
  const { data, isLoading } = useFetchProductsQuery();

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
      <ProductList products={data} />
    </div>
  );
}
