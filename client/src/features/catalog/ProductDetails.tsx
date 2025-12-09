import { useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import {
  useAddBasketItemMutation,
  useFetchBasketQuery,
  useRemoveBasketItemMutation,
} from "../basket/basketApi";
import { useEffect, useState, type ChangeEvent } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useFetchProductDetailsQuery(
    id ? +id : 0
  );

  const { data: basekt } = useFetchBasketQuery();
  const [addBasketItem] = useAddBasketItemMutation();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [quantity, setQuantity] = useState(0);

  const item = basekt?.items.find((item) => item.productId === +id!);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item]);

  if (!product || isLoading) return <div>Loading...</div>;

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.currentTarget.value;
    if (value >= 0) setQuantity(value);
  };

  const handleOnBasketUpdate = () => {
    const updatedQuantity = item
      ? Math.abs(quantity - item.quantity)
      : quantity;
    if (!item || quantity > item.quantity) {
      addBasketItem({ item: product, quantity: updatedQuantity });
    } else {
      removeBasketItem({ productId: product.id, quantity: updatedQuantity });
    }
  };

  const productDetails = [
    { label: "Name", value: product.name },
    { label: "Description", value: product.description },
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quantity in Stock", value: product.quantityInStock },
  ];

  return (
      <Grid2 container spacing={2} maxWidth="lg" sx={{ mx: "auto" }}>
        <Grid2 size={6}>
          <img
            src={product?.imageUrl}
            alt={product.name}
            style={{ width: "100%" }}
          />
        </Grid2>
        <Grid2 size={6}>
          <Typography variant="h3">{product.name}</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="h4" color="secondary">
            ${product.price.toFixed(2)}
          </Typography>
          <TableContainer>
            <Table sx={{ "& td": { fontSize: "1rem" } }}>
              <TableBody>
                {productDetails.map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      {detail.label}
                    </TableCell>
                    <TableCell>{detail.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid2 container spacing={2} marginTop={3}>
            <Grid2 size={6}>
              <TextField
                onChange={handleOnChange}
                variant="outlined"
                type="number"
                label="Quantity in basket"
                fullWidth
                value={quantity}
              />
            </Grid2>
            <Grid2 size={6}>
              <Button
                disabled={
                  (item && item.quantity === quantity) ||
                  (!item && quantity === 0)
                }
                onClick={handleOnBasketUpdate}
                color="primary"
                size="large"
                variant="contained"
                fullWidth
                sx={{ height: "55px" }}
              >
                {item ? "Update Quantity" : "Add to Basket"}
              </Button>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
  );
}
