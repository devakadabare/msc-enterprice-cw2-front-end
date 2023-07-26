import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Container, Typography, Box } from "@mui/material";

import { updateTokenToReducer } from "../../login/actions";
import { getUserLastWeightRequest } from "../actions";
import { getLoggedUserData, userLastWeight } from "../selectors";
import { AppWidgetSummary } from "../../../components/dashboard";
import Iconify from "../../../components/iconify";

const HomeView = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => getLoggedUserData(state));
  const userLastWeightData = useSelector((state) => userLastWeight(state));
  const { weight } = userLastWeightData || { weight: 0 };

  const dispatch = useDispatch();

  const updateToken = useCallback(
    (info) => {
      dispatch(updateTokenToReducer(info));
    },
    [dispatch]
  );

  const getUserLastWeight = useCallback(
    (info) => {
      dispatch(getUserLastWeightRequest(info));
    },
    [dispatch]
  );

  useEffect(() => {
    updateToken();
    getUserLastWeight(userData?.id);
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>

      <Box sx={{ width: '80%', p: 2 }}>
        <Container>
          <Container maxWidth="xl">
            <Typography variant="h3" color="primary" sx={{ mb: 5 }}>
              Hi {userData?.name}, Welcome back
            </Typography>
          </Container>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="User Current Weight"
                total={`${weight || 0} Kg`}
                icon={"ant-design:user-outlined"}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="User Current Height"
                total={`${userData?.height || 0} cm`}
                color="error"
                icon={"ant-design:fire-filled"}
              />
            </Grid>
            {/* Two more widgets here */}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default HomeView;
