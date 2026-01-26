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
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Review from "./Review";
import {
  useFetchAddressQuery,
  useUpdateAddressMutation,
} from "../account/accountApi";
import type { Address } from "../../app/models/user";
import type {
  StripeAddressElementChangeEvent,
  StripePaymentElementChangeEvent,
} from "@stripe/stripe-js";
import type { Basket } from "../../app/models/basket";

type Props = {
  basket: Basket;
};

const steps = ["Address", "Payment", "Review"];

export default function CheckoutStepper({ basket }: Props) {
  const { data: address, isLoading } = useFetchAddressQuery();
  const [updateAddress] = useUpdateAddressMutation();
  const [activeStep, setActiveStep] = useState(0);
  const [saveAddressChecked, setSaveAddressChecked] = useState(false);
  const [addressComplete, setAddressComplete] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const elements = useElements();

  const handleNext = async () => {
    if (activeStep === 0 && saveAddressChecked) {
      const address = await getStripeAddress();
      if (address) await updateAddress(address);
    }
    setActiveStep((prevState) => prevState + 1);
  };

  const handleBack = () => setActiveStep((prevState) => prevState - 1);

  const handleAddressChange = (e: StripeAddressElementChangeEvent) =>
    setAddressComplete(e.complete);
  const handlePaymentChange = (e: StripePaymentElementChangeEvent) =>
    setPaymentComplete(e.complete);

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

  const subTotal =
    basket.items.reduce(
      (subTotal, item) => subTotal + item.price * item.quantity,
      0
    ) ?? 0;

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
            <PaymentElement onChange={handlePaymentChange} />
          </Box>
          <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
            <Review />
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
              activeStep === 3
            }
          >
            {activeStep === 2 ? `Pay $${subTotal.toFixed(2)}` : "Next"}
          </Button>
        </Box>
      </Paper>
    </>
  );
}
