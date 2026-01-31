import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import useBasket from "../../app/hooks/useBasket";

export default function Review() {
  const { basket } = useBasket();

  return (
    <div>
      <Box mt={4} width="100%">
        <Typography variant="h6" fontWeight="bold">
          Billing and delivery information
        </Typography>
        <dl>
          <Typography component="dt" fontWeight="medium">
            Shipping Address
          </Typography>
          <Typography component="dd" mt={1} color="textsecondary">
            Address goes here
          </Typography>
          <Typography component="dt" fontWeight="medium">
            Payment Details
          </Typography>
          <Typography component="dd" mt={1} color="textsecondary">
            Payment details goes here
          </Typography>
        </dl>
      </Box>
      <Box mt={3} mx="auto">
        <dl>
          <Typography component="dt" fontWeight="medium">
            Shipping Items
          </Typography>
        </dl>
        <Divider />
        <TableContainer>
          <Table>
            <TableBody>
              {basket?.items.map((item) => (
                <TableRow
                  key={item.productId}
                  sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                >
                  <TableCell sx={{ py: 4 }}>
                    <Box display="flex" alignItems="center" gap={3}>
                      <img
                        src={item.pictureUrl}
                        alt={item.name}
                        style={{ width: 40, height: 40 }}
                      />
                      <Typography>{item.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ p: 4 }}>
                    X {item.quantity}
                  </TableCell>
                  <TableCell align="right" sx={{ p: 4 }}>
                    ${(item.quantity * item.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
