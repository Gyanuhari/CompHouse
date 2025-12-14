import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";
import { useFetchFiltersQuery } from "./catalogApi";
import Search from "./Search";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { setOrderBy } from "./catalogSlice";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

export default function Filters() {
  const { data: filters } = useFetchFiltersQuery();
  const { orderBy } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pr: 2 }}>
      <Paper>
        <Search />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <RadioButtonGroup
          options={sortOptions}
          selectedValue={orderBy}
          onChange={(e) => dispatch(setOrderBy(e.target.value))}
        />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <FormGroup>
          {filters &&
            filters.brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox color="secondary" sx={{ py: 0.7, fontSize: 40 }} />
                }
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
                control={
                  <Checkbox color="secondary" sx={{ py: 0.7, fontSize: 40 }} />
                }
                label={type}
              />
            ))}
        </FormGroup>
      </Paper>
    </Box>
  );
}
