import { Grid2 as Grid, Typography } from "@mui/material";
import { useFetchBasketQuery } from "../basket/basketApi";
import OrderSummary from "../../app/shared/components/OrderSummary";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutStepper from "./CheckoutStepper";
import { useEffect, useMemo, useRef } from "react";
import { useCreatePaymentIntentMutation } from "./checkoutApi";
import { useAppSelector } from "../../app/store/store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function CheckoutPage() {
  const { data: basket, isLoading: isBasketLoading } = useFetchBasketQuery();
  const [createPaymentIntent, { isLoading: isPaymentIntentLoading }] =
    useCreatePaymentIntentMutation();
  const created = useRef(false);
  const { darkMode } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (!created.current) createPaymentIntent();
    created.current = true;
  }, [createPaymentIntent]);

  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;

    return {
      clientSecret: basket.clientSecret,
      appearance: {
        labels: "floating",
        theme: darkMode ? "night" : "stripe",
      },
    };
  }, [basket?.clientSecret, darkMode]);

  if (isBasketLoading)
    return <Typography variant="h4">Loading basket...</Typography>;

  if (!basket || basket.items.length === 0)
    return <Typography variant="h3">Your basket is empty!!</Typography>;

  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {!stripePromise || !options || isPaymentIntentLoading ? (
          <Typography variant="h6">Loading Checkout...</Typography>
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutStepper />
          </Elements>
        )}
      </Grid>
      <Grid size={4}>
        <OrderSummary />
      </Grid>
    </Grid>
  );
}
