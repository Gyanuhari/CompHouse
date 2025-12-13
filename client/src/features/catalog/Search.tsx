import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { setSearchTerm } from "./catalogSlice";

export default function Search() {
  const { searchTerm } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  return (
    <TextField
      label="Search products"
      variant="outlined"
      fullWidth
      type="search"
      value={searchTerm}
      onChange={(e) => dispatch(setSearchTerm(e.target.value))}
    />
  );
}
