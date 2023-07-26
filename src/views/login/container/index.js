import { useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import useResponsive from "../../../hooks/useResponsive";
import Iconify from "../../../components/iconify";
import BackgroundImage from "../../../assets/images/background/login-bg.png";
import { userLoginRequest } from "../actions";
import { Label } from "@mui/icons-material";

const StyledRoot = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: theme.palette.background.paper,
}));

const StyledContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
  maxWidth: 480,
}));

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const userLogin = useCallback(
    (info) => {
      dispatch(userLoginRequest(info));
    },
    [dispatch]
  );

  return (
    <StyledRoot>
      <Container maxWidth="sm">
        <StyledContent>
        <img
          src="https://img.freepik.com/premium-vector/fitness-logo_25327-145.jpg?w=2000"
          alt="Logo"
          style={{ width: '100%', height: 'auto', marginBottom: '1rem' }} // adjust size and margins as necessary
        />
          <Typography variant="h4" gutterBottom>
            Sign in to Fitness Tracker
          </Typography>
          <Stack spacing={3} width="100%">
            
            <TextField
              fullWidth
              label=""
              variant="outlined"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              placeholder="Password"
              label=""
              variant="outlined"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Link
              variant="subtitle2"
              component={Button}
              onClick={handleSignupClick}
            >
              Don't have an account? Sign up here.
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="error"
            onClick={() => {
              userLogin({ email, password });
            }}
            sx={{ mt: 3 }}
          >
            Login
          </LoadingButton>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
