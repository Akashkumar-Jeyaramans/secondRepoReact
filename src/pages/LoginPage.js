import { Alert, Box, Grid, Typography } from "@mui/material";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import logo from "../assets/images/logo-new.svg";
import React, { useEffect } from "react";
import { Form, useForm } from "../components/common/form/useForm";
import Controls from "../components/common/form/controls/Controls";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthData,
  clearState,
  getInitialUser,
  loginUser,
  userAuthSelector,
} from "../features/useeAuthSlice";
import { useSnackbar } from "notistack";
import ProtectedApis from "../utils/apis/protectedApis";

const initialFValues = {
  username: "",
  password: "",
  rememberMe: false,
};

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage, initialUserData } =
    useSelector(userAuthSelector);
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "This field is required";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required";

    seterrors({ ...temp });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, errors, seterrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(loginUser(values));
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("nmstoken");
    sessionStorage.removeItem("nmsuser");
    delete ProtectedApis.defaults.headers.common["Authorization"];
    dispatch(clearAuthData());
    dispatch(getInitialUser());

    return () => {
      dispatch(clearState());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
      //notification.error({ message: errorMessage });
      resetForm();
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      enqueueSnackbar("Successfully loggedin !", {
        variant: "success",
      });
      //notification.success({ message: "Successfully loggedin !" });
      resetForm();
      navigate("/dashboard");
    }
  }, [isError, isSuccess]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: "light",
          primary: {
            main: theme.palette.primary.main,
            contrastText: theme.palette.primary.contrastText,
          },
          secondary: {
            main: theme.palette.secondary.main,
            contrastText: theme.palette.secondary.contrastText,
          },
        },
      })}
    >
      <CssBaseline />
      <Box
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f7f7",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "450px",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="logo"
            width={260}
            sx={{ marginBottom: "10px" }}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Alert icon={false} severity="warning" sx={{ width: "100%" }}>
            <Typography variant="subtitle2" gutterBottom component="div">
              username:- {initialUserData.username}
            </Typography>
            <Typography variant="subtitle2" component="div">
              password:- {initialUserData.password}
            </Typography>
          </Alert>
          <Form onSubmit={handleSubmit}>
            <Grid container>
              <Grid item sm={12}>
                <Controls.Input
                  name="username"
                  label="Username"
                  value={values.username}
                  onChange={handleInputChange}
                  error={errors.username}
                />
                <Controls.Input
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
                <Controls.CheckBox
                  name="rememberMe"
                  label="Remember me"
                  value={values.rememberMe}
                  onChange={handleInputChange}
                />
                <div>
                  <LoadingButton
                    type="submit"
                    loading={isFetching}
                    variant="contained"
                    fullWidth
                  >
                    Submit
                  </LoadingButton>
                </div>
              </Grid>
            </Grid>
          </Form>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
