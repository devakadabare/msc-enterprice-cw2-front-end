import React, { useEffect, useCallback } from "react";
import { Typography, Grid, Card, CardContent, Container, Box  } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  userPredictionData,
  getLoggedUserData,
  userLastWeight,
} from "../selectors";
import { getUserPredictionDataRequest } from "../actions";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    backgroundImage: `url('https://images.ctfassets.net/6m9bd13t776q/1BXuec9CS4emOmYoQQaIGe/0ac9554954e87fc2ca41c7889692642c/Untitled_Image?q=75&w=660')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '50vh', // Adjust this value to your liking
  },
  card: {
    background: 'rgba(0, 0, 0, 0.5)',
  },
  cardContent: {
    color: '#fff',
  },
}));

const PredictionPage = () => {
  const predictionData = useSelector((state) => userPredictionData(state));
  const userData = useSelector((state) => getLoggedUserData(state));
  const userLastWeightData = useSelector((state) => userLastWeight(state));

  const dispatch = useDispatch();

  const getUserPredictionData = useCallback(
    (info) => {
      dispatch(getUserPredictionDataRequest(info));
    },
    [dispatch]
  );

  useEffect(() => {
    getUserPredictionData(userData.id);
  }, []);

  const classes = useStyles();

  return (
    <Container>
      <Box className={classes.imageContainer}></Box>
      <div>
        <Grid container spacing={2} style={{ marginTop: 60 }}>
          <Grid item xs={12} md={12} lg={3}></Grid>
          <Grid item xs={12} md={12} lg={6}>
          <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography
                  variant="h4"
                  gutterBottom
                  style={{ marginBottom: 20 }}
                >
                  Prediction Result
                </Typography>
                {/* {predictionData?.weight == "" && (
                  <Typography gutterBottom>
                    No Prediction Data Found!
                  </Typography>
                )} */}
                <Typography gutterBottom>
                    Predicted Date: 2023-08-01 <br />
                    Predicted Weight:{" "}
                    58 kg
                    <br />
                    Current Weight: 60 kg
                    <br />
                    Weight Difference:{" "}
                    2
                    kg
                  </Typography>
                {predictionData && predictionData?.weight != "" && (
                  <Typography gutterBottom>
                    Predicted Date: {predictionData.date.split("T")[0]} <br />
                    Predicted Weight:{" "}
                    {Math.round(predictionData.weight * 100) / 100} kg
                    <br />
                    Current Weight: {userLastWeightData?.weight} kg
                    <br />
                    Weight Difference:{" "}
                    {Math.round(
                      (predictionData.weight - userLastWeightData?.weight) * 100
                    ) / 100}{" "}
                    kg
                  </Typography>
                )}
                {/* {predictionData &&
                  predictionData.length > 0 &&
                  predictionData.map((item) => {
                    return (
                      <Typography gutterBottom>
                        Predicted Date: {predictionData.date.split("T")[0]} <br />
                        Predicted Weight: {Math.round(predictionData.weight * 100) /
                          100}{" "}
                        kg
                        <br />
                        Current Weight: {userLastWeightData?.weight} kg
                        <br />
                        Weight Difference:{" "}
                        {Math.round(
                          (predictionData.weight - userLastWeightData?.weight) * 100
                        ) / 100}{" "}
                        kg
                      </Typography>
                    );
                  })} */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default PredictionPage;
