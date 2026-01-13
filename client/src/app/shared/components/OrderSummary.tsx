import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import type { Basket } from "../../models/basket";
import { Link } from "react-router-dom";

type Props = {
  basket: Basket;
};

export default function OrderSummary({ basket }: Props) {
  const subTotal =
    basket?.items?.reduce(
      (subTotal, item) => subTotal + item.quantity * item.price,
      0
    ) ?? 0;

  const deliveryFee = subTotal < 2500 ? 50 : 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "lg",
        mx: "auto",
      }}
    >
      <Paper sx={{ p: 2, mb: 2, borderRadius: 2, width: "100%" }}>
        <Typography variant="h6" component="p" fontWeight="bold">
          Order Summary
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          Orders over $2499 qualify for free delivery!
        </Typography>
        <Box mt={2}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Subtotal</Typography>
            <Typography color="textSecondary">
              ${subTotal.toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Discount</Typography>
            <Typography color="success">-${(0).toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Delivery fee</Typography>
            <Typography color="textSecondary">
              ${deliveryFee.toFixed(2)}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Total</Typography>
            <Typography color="textSecondary">
              ${(subTotal + deliveryFee).toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
            <Button fullWidth component={Link} to="/catalog">
              Continue Shopping
            </Button>
          </Box>
        </Box>
      </Paper>
      <Paper sx={{ p: 2, width: "100%", borderRadius: 2 }}>
        <form>
          <Typography variant="subtitle1" component="label">
            Do you have a voucher code?
          </Typography>
          <TextField
            label="Voucher code"
            variant="outlined"
            fullWidth
            sx={{ my: 1 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Apply Code
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
