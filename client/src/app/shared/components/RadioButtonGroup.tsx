import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { ChangeEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function RadioButtonGroup({
  options,
  selectedValue,
  onChange,
}: Props) {
  return (
    <FormControl>
      <RadioGroup onChange={onChange} value={selectedValue} sx={{ my: 0 }}>
        {options.map((option) => (
          <FormControlLabel
            key={option.label}
            control={<Radio color="secondary" sx={{ py: 0.7 }} />}
            label={option.label}
            value={option.value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
