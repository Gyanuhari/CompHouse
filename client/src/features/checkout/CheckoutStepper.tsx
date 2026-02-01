import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Step,
  StepLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Review from "./Review";
import {
  useFetchAddressQuery,
  useUpdateAddressMutation,
} from "../account/accountApi";
import type { Address } from "../../app/models/user";
import type {
  ConfirmationToken,
  StripeAddressElementChangeEvent,
  StripePaymentElementChangeEvent,
} from "@stripe/stripe-js";
import useBasket from "../../app/hooks/useBasket";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const steps = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
  const { data: address, isLoading } = useFetchAddressQuery();
  const { basket, total, clearBasket } = useBasket();
  const [updateAddress] = useUpdateAddressMutation();
  const [activeStep, setActiveStep] = useState(0);
  const [saveAddressChecked, setSaveAddressChecked] = useState(false);
  const [addressComplete, setAddressComplete] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [confirmationToken, setConfirmationToken] =
    useState<ConfirmationToken | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();

  const handleNext = async () => {
    if (activeStep === 0 && saveAddressChecked) {
      const address = await getStripeAddress();
      if (address) await updateAddress(address);
    }
    if (activeStep === 1) {
      if (!elements || !stripe) return;
      const result = await elements.submit();
      if (result.error) return toast.error(result.error.message);

      const stripeResult = await stripe.createConfirmationToken({ elements });
      if (stripeResult.error) return toast.error(stripeResult.error.message);
      setConfirmationToken(stripeResult.confirmationToken);
    }
    if (activeStep === 2) await confirmPayment();
    if (activeStep < 2) setActiveStep((prevState) => prevState + 1);
  };

  const handleBack = () => setActiveStep((prevState) => prevState - 1);

  const handleAddressChange = (e: StripeAddressElementChangeEvent) =>
    setAddressComplete(e.complete);
  const handlePaymentChange = (e: StripePaymentElementChangeEvent) =>
    setPaymentComplete(e.complete);

  const confirmPayment = async () => {
    setSubmitting(true);
    try {
      if (!confirmationToken || !basket?.clientSecret)
        throw new Error("Unable to process payment");
      const paymentResult = await stripe?.confirmPayment({
        clientSecret: basket.clientSecret,
        redirect: "if_required",
        confirmParams: {
          confirmation_token: confirmationToken.id,
        },
      });
      if (paymentResult?.paymentIntent?.status === "succeeded") {
        navigate("/checkout/success");
        clearBasket();
      } else if (paymentResult?.error) {
        throw new Error(paymentResult.error.message);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      setActiveStep((activeStep) => activeStep - 1);
    } finally {
      setSubmitting(false);
    }
  };

  const getStripeAddress = async () => {
    const addressElement = elements?.getElement("address");
    if (addressElement) {
      const {
        value: { name, address },
      } = await addressElement.getValue();
      if (name && address) return { name, ...address };
    }
    return null;
  };

  if (isLoading) return <Typography variant="h6">Loading...</Typography>;

  const { name, ...restAddress } = address || ({} as Address);

  return (
    <>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
            <AddressElement
              options={{
                mode: "shipping",
                defaultValues: {
                  name: name,
                  address: restAddress,
                },
              }}
              onChange={handleAddressChange}
            />
            <FormControlLabel
              sx={{ display: "flex", justifyContent: "end" }}
              control={
                <Checkbox
                  checked={saveAddressChecked}
                  onChange={(e) => setSaveAddressChecked(e.target.checked)}
                />
              }
              label="Save as default address"
            />
          </Box>
          <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
            <PaymentElement
              onChange={handlePaymentChange}
              options={{
                wallets: {
                  applePay: "never",
                  googlePay: "never",
                },
              }}
            />
          </Box>
          <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
            <Review confirmationToken={confirmationToken} />
          </Box>
        </Box>
        <Box display="flex" paddingTop={2} justifyContent="space-between">
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !addressComplete) ||
              (activeStep === 1 && !paymentComplete) ||
              submitting
            }
            loading={submitting}
            loadingIndicator="Submitting"
          >
            {activeStep === 2 ? `Pay $${total.toFixed(2)}` : "Next"}
          </Button>
        </Box>
      </Paper>
    </>
  );
}
