import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import {
  useLazyGet400ErrorQuery,
  useLazyGet401ErrorQuery,
  useLazyGet404ErrorQuery,
  useLazyGet500ErrorQuery,
  useLazyGetValidationErrorQuery,
} from "./errorApi";
import { useState } from "react";

export default function ErrorPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [trigger400Error] = useLazyGet400ErrorQuery();
  const [trigger401Error] = useLazyGet401ErrorQuery();
  const [trigger404Error] = useLazyGet404ErrorQuery();
  const [trigger500Error] = useLazyGet500ErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string"
      ) {
        const errorArray = (error as { message: string }).message.split(",");
        setValidationErrors(errorArray);
      }
    }
  };
  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h3">
        Handle Errors
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => trigger400Error().catch((err) => console.log(err))}
        >
          Bad Request
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger401Error().catch((err) => console.log(err))}
        >
          Unauthorized
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger404Error().catch((err) => console.log(err))}
        >
          Not Found
        </Button>
        <Button
          variant="contained"
          onClick={() => trigger500Error().catch((err) => console.log(err))}
        >
          Server Error
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          Validation Errors
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>{error}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
