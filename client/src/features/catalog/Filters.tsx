import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Paper,
  Radio,
  TextField,
} from "@mui/material";
import { useFetchFiltersQuery } from "./catalogApi";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

export default function Filters() {
  const { data: filters } = useFetchFiltersQuery();

  console.log(filters);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pr: 2 }}>
      <Paper>
        <TextField label="Search products" variant="outlined" fullWidth />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <FormControl>
          {sortOptions.map((option) => (
            <FormControlLabel
              key={option.label}
              control={<Radio sx={{ py: 0.7 }} />}
              label={option.label}
              value={option.value}
            />
          ))}
        </FormControl>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <FormGroup>
          {filters &&
            filters.brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={<Checkbox color="secondary" sx={{ py: 0.7 , fontSize: 40}} />}
                label={brand}
              />
            ))}
        </FormGroup>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <FormGroup>
          {filters &&
            filters.types.map((type) => (
              <FormControlLabel
                key={type}
                control={<Checkbox color="secondary" sx={{ py: 0.7 , fontSize: 40}} />}
                label={type}
              />
            ))}
        </FormGroup>
      </Paper>
    </Box>
  );
}
