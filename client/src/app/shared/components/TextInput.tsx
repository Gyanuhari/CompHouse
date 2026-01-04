import { Box, TextField, type TextFieldProps } from "@mui/material";

type Props = TextFieldProps;

export default function TextInput({ helperText, ...props }: Props) {
  return (
    <Box>
      <TextField error={!!helperText} helperText={helperText} {...props} />
    </Box>
  );
}
