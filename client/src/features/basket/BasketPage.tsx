import { Typography } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi";
import BasketItem from "./BasketItem";

export default function BasketPage() {
  const { data: basket, isLoading } = useFetchBasketQuery();

  if (isLoading) return <Typography>Loading basket...</Typography>;

  if (!basket)
    return <Typography variant="h3">Your basket is empty!!</Typography>;

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {basket.items.map((item) => (
          <BasketItem item={item} key={item.productId} />
        ))}
      </Grid>
    </Grid>
  );
}
