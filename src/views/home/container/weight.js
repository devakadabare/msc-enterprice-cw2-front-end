import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Box,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { addWeightRequest, getWeightListRequest } from "../actions";
import { userWeightList, getLoggedUserData } from "../selectors";

const WeightPage = () => {
  const dispatch = useDispatch();

  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [weightList, setWeightList] = useState([]);

  const weightListData = useSelector((state) => userWeightList(state));
  const userData = useSelector((state) => getLoggedUserData(state));

  const addWeight = useCallback(
    (info) => {
      dispatch(addWeightRequest(info));
    },
    [dispatch]
  );

  const getWeightList = useCallback(
    (info) => {
      dispatch(getWeightListRequest(info));
    },
    [dispatch]
  );

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleAddCheatMeal = () => {
    if (weight !== "" && date !== "") {
      // convert date to 2023-07-13 00:00:00.000000 format
      const dateObj = new Date(date);
      addWeight({
        weight,
        date: dateObj,
        userId: userData.id,
      });
    }
  };

  useEffect(() => {
    getWeightList(userData.id);
  }, []);

  useEffect(() => {
    setWeightList(weightListData);
  }, [weightListData]);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
          mb: 4
        }}
      >
        <Typography variant="h4" gutterBottom>
          Weight Tracker
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Card
              sx={{
                borderRadius: '15px',
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
                overflow: 'hidden',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Add Weight
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <TextField
                    label="Enter Weight"
                    variant="outlined"
                    value={weight}
                    onChange={handleWeightChange}
                    sx={{ mr: 2, flex: 1 }}
                  />
                  <TextField
                    label="Date"
                    variant="outlined"
                    value={date}
                    onChange={handleDateChange}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ mr: 2, flex: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleAddCheatMeal}
                    sx={{ width: 150, height: 40 }}
                  >
                    Add
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Card
              sx={{
                borderRadius: '15px',
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
                overflow: 'hidden',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Weight History
                </Typography>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Weight</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {weightList.length > 0 ? (
                        weightList.map((row) => (
                          <TableRow
                            key={row.name}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                          >
                            <TableCell>{row.date?.split("T")[0]}</TableCell>
                            <TableCell>{row.weight}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell> No weight recorded </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WeightPage;
