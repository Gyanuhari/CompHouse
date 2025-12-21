import { Box, Paper } from "@mui/material";
import Search from "./Search";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import RadioButtonGroup from "../../app/shared/components/RadioButtonGroup";
import { setBrands, setOrderBy, setTypes } from "./catalogSlice";
import CheckboxButtons from "../../app/shared/components/CheckboxButtons";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price: High to Low" },
  { value: "price", label: "Price: Low to High" },
];

type Props = {
  filters: { brands: string[]; types: string[] };
};

export default function Filters({ filters }: Props) {
  const { brands, types, orderBy } = useAppSelector((state) => state.catalog);
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
        <CheckboxButtons
          items={filters.brands}
          checked={brands}
          onChange={(items: string[]) => dispatch(setBrands(items))}
        />
      </Paper>
      <Paper sx={{ p: 3 }}>
        <CheckboxButtons
          items={filters.types}
          checked={types}
          onChange={(items: string[]) => dispatch(setTypes(items))}
        />
      </Paper>
    </Box>
  );
}
