import { LockOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import { useLoginMutation } from "./accountApi";

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailEdit, setEmailEdit] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordEdit, setPasswordEdit] = useState(false);

  const emailIsInvalid =
    emailEdit && (!email.includes("@") || !email.includes("."));
  const passwordIsInvalid = passwordEdit && password.length < 6;

  const handleEmailBlur = () => setEmailEdit(true);
  const handlePasswordBlur = () => setPasswordEdit(true);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const buttonDisabled =
    !emailEdit ||
    emailIsInvalid ||
    !passwordEdit ||
    passwordIsInvalid ||
    isLoading;

  const handleSubmit = async () => {
    try {
      await login({ email: email, password: password }).unwrap();
      navigate("/catalog");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component={Paper} maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop="8"
      >
        <LockOutlined sx={{ fontSize: 40, color: "secondary.main", mt: 3 }} />
        <Typography variant="h5">Sign In</Typography>
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          gap={3}
          width="100%"
          marginY={3}
        >
          <TextField
            label="Email"
            type="email"
            name="email"
            autoFocus
            fullWidth
            value={email}
            error={emailIsInvalid}
            helperText={emailIsInvalid && "Please enter valid email address"}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            slotProps={{ input: { autoComplete: "email" } }}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            value={password}
            error={passwordIsInvalid}
            helperText={
              passwordIsInvalid && "Password must be longer than 6 characters"
            }
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            slotProps={{ input: { autoComplete: "current-password" } }}
          />
          <Button
            variant="contained"
            disabled={buttonDisabled}
            onClick={handleSubmit}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
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
