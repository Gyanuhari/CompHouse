import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  type RegisterSchema,
} from "../../lib/schemas/registerSchema";
import { useRegisterMutation } from "./accountApi";
import type { RegisterRequest } from "../../app/models/user";

export default function RegisterForm() {
  const [registerUser] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isLoading },
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const registerRequest: RegisterRequest = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      };
      await registerUser(registerRequest).unwrap();
    } catch (error) {
      // Handling server-side validation errors.
      const apiError = error as { message: string };
      if (apiError.message && typeof apiError.message === "string") {
        const errorArray = apiError.message.split(",");
        errorArray.forEach((err) => {
          if (err.includes("Email")) {
            setError("email", { message: err });
          } else if (err.includes("Password")) {
            setError("password", { message: err });
          }
        });
      }
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
        <Typography variant="h5">Sign Up</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={3}
          width="100%"
          marginY={3}
        >
          <TextField
            label="Full Name"
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            fullWidth
            slotProps={{ input: { autoComplete: "fullName" } }}
          />
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            slotProps={{ input: { autoComplete: "email" } }}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            slotProps={{ input: { autoComplete: "password" } }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            fullWidth
            slotProps={{ input: { autoComplete: "confirmPassword" } }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isLoading}
          >
            {isLoading ? "Signing Up" : "Sign Up"}
          </Button>
          <Typography textAlign="center">
            Already have an account?
            <Typography
              component={Link}
              to="/login"
              color="primary"
              marginLeft={1}
            >
              Sign In
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
