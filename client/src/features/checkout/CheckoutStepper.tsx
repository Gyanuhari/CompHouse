import { Box, Button, Paper, Step, StepLabel } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import { useState } from "react";

const steps = ["Address", "Payment", "Review"];

export default function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prevState) => prevState + 1);
  const handleBack = () => setActiveStep((prevState) => prevState - 1);

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
            Address Step
          </Box>
          <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
            Payment Step
          </Box>
          <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
            Review Step
          </Box>
        </Box>
        <Box display="flex" paddingTop={2} justifyContent="space-between">
          <Button onClick={handleBack} disabled={activeStep === 0}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={activeStep === 2}>
            Next
          </Button>
        </Box>
      </Paper>
    </>
  );
}
