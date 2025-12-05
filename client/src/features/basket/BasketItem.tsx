import {
  Box,
  Grid2 as Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import type { Item } from "../../app/models/basket";
import { Add, Close, Remove } from "@mui/icons-material";
import { useRemoveBasketItemMutation } from "./basketApi";

type Props = {
  item: Item;
};

export default function BasketItem({ item }: Props) {
  const [removeBasketItem] = useRemoveBasketItemMutation();
  return (
    <Paper
      sx={{
        height: 140,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={item.pictureUrl}
          alt={item.name}
          sx={{
            width: 150,
            height: 100,
            objectFit: "cover",
            borderRadius: "4px",
            mr: 8,
            ml: 4,
          }}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">{item.name}</Typography>
          <Box display="flex" alignItems="center" gap={3}>
            <Typography sx={{ fontSize: "1.1rem" }} color="primary">
              ${item.price.toFixed(2)}
            </Typography>
          </Box>
          <Grid container spacing={1} alignItems="center">
            <IconButton
              onClick={() =>
                removeBasketItem({ productId: item.productId, quantity: 1 })
              }
              color="error"
              size="small"
              sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
            >
              <Remove />
            </IconButton>
            <Typography variant="h6">{item.quantity}</Typography>
            <IconButton
              color="success"
              size="small"
              sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
            >
              <Add />
            </IconButton>
          </Grid>
        </Box>
      </Box>
      <IconButton
        onClick={() =>
          removeBasketItem({
            productId: item.productId,
            quantity: item.quantity,
          })
        }
        size="small"
        color="error"
        sx={{
          border: 1,
          borderRadius: 1,
          minWidth: 0,
          alignSelf: "start",
          m: 1,
        }}
      >
        <Close />
      </IconButton>
    </Paper>
  );
}
