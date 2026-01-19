import { Grid2 as Grid, Typography } from "@mui/material";
import { useFetchBasketQuery } from "../basket/basketApi";
import OrderSummary from "../../app/shared/components/OrderSummary";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutStepper from "./CheckoutStepper";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CheckoutPage() {
  const { data: basket, isLoading } = useFetchBasketQuery();

  if (isLoading) return <Typography>Loading basket...</Typography>;

  if (!basket || basket.items.length === 0)
    return <Typography variant="h3">Your basket is empty!!</Typography>;

  if (isLoading) return <Typography variant="h4">Loading...</Typography>;
  
  return (
    <Grid container padding={2}>
      <Grid size={8}>
        <Elements stripe={stripePromise}>
          <CheckoutStepper />
        </Elements>
      </Grid>
      <Grid size={4}>
        <OrderSummary basket={basket} />
      </Grid>
    </Grid>
  );
}
