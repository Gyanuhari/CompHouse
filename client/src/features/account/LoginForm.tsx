import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLazyUserInfoQuery, useLoginMutation } from "./accountApi";
import TextInput from "../../app/shared/components/TextInput";
import useInput from "../../app/hooks/useInput";
import {
  allOf,
  isNotEmpty,
  isValidEmail,
  isValidPassword,
} from "../../lib/util";
import { useState } from "react";
import type { LoginRequest } from "../../app/models/user";

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const [fetchUserInfo] = useLazyUserInfoQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    value: email,
    hasError: emailHasError,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
  } = useInput("", allOf(isNotEmpty, isValidEmail));

  const {
    value: password,
    hasError: passwordHasError,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
  } = useInput("", allOf(isNotEmpty, isValidPassword));

  const handleSubmit = async () => {
    try {
      const credentials: LoginRequest = { email: email.trim(), password };
      await login(credentials).unwrap();
      // Forces immediate cache update invalidated by login mutation, before navigation.
      await fetchUserInfo();
      navigate(location.state?.from || "/catalog");
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
          <TextInput
            label="Email"
            type="email"
            name="email"
            fullWidth
            value={email}
            helperText={emailHasError && "Please enter valid email address"}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            slotProps={{ input: { autoComplete: "email" } }}
          />
          <TextInput
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            fullWidth
            value={password}
            helperText={
              passwordHasError &&
              "Password must contain 8-15 characters, including uppercase, lowercase, number and special character"
            }
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            slotProps={{
              input: {
                autoComplete: "current-password",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            variant="contained"
            disabled={isLoading}
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
