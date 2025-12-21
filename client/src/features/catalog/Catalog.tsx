import { Grid2 as Grid, Typography } from "@mui/material";
import { useFetchFiltersQuery, useFetchProductsQuery } from "./catalogApi";
import Filters from "./Filters";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import ProductList from "./ProductList";
import AppPagination from "../../app/shared/components/AppPagination";
import { setPageNumber } from "./catalogSlice";

export default function Catalog() {
  const productParams = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const { data, isLoading: isProductLoading } = useFetchProductsQuery(productParams);
  const { data: filters, isLoading: isFiltersLoading} = useFetchFiltersQuery();

  if (isProductLoading || isFiltersLoading || !data || !filters) return <div>Loading...</div>;

  return (
    <Grid container>
      <Grid size={3}>
        <Filters filters={filters}/>
      </Grid>
      <Grid size={9}>
        {data.items && data.items.length > 0 ? (
          <>
            <ProductList products={data.items} />
            <AppPagination
              meta={data.pagination}
              onPageChange={(page: number) => {
                dispatch(setPageNumber(page));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        ) : (
          <Typography variant="h5">
            There are no items for this filter
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
