import { LockOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="8"
      >
        <LockOutlined sx={{ fontSize: 40, color:"secondary.main", mt: 3}}/>
        <Typography variant="h5">Sign In</Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={3}
          width="100%"
          marginY={3}
        >
          <TextField label="Email" autoFocus fullWidth/>
          <TextField label="Password" type="password" fullWidth/>
          <Button variant="contained">Sign In</Button>
          <Typography textAlign="center">
            Don't have an account?
            <Typography
              component={Link}
              to="/register"
              color="primary"
              marginLeft={1}
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
