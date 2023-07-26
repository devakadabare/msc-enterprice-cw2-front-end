import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Typography, Grid, Card, CardContent, Container, ListItem, List, ListItemText, Box } from "@mui/material";
import { getWorkoutPlanDetailsRequest } from "../actions";
import { getWorkoutPlanDetails, userEnrolledWorkoutPlanData } from "../selectors";
import { WorkoutDayCard } from "../../../components/dashboard";
//import workoutImage from "../../../assets/images/your-image.jpg";
const ActiveWorkoutView = () => {
  // get the workout id from the url
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const workoutPlanDetails = useSelector((state) =>
    getWorkoutPlanDetails(state)
  );

  const enrolledWorkoutData = useSelector((state) =>
    userEnrolledWorkoutPlanData(state)
  );

  const getWorkoutDetails = useCallback(
    (info) => {
      dispatch(getWorkoutPlanDetailsRequest(info));
    },
    [dispatch]
  );

  useEffect(() => {
    getWorkoutDetails(id);
  }, [id]);

  const [completedWorkouts, setCompletedWorkouts] = useState([]);

  const handleCompleteWorkout = (day) => {
    setCompletedWorkouts([...completedWorkouts, day]);
  };

  const getDaysArray = () => {
    const completedDays = enrolledWorkoutData[0]?.completedDays || 0;
    const daysArray = [];
    for (let i = 1; i <= workoutPlanDetails?.duration; i++) {
      daysArray.push({
        id: i,
        name: `Day ${i}`,
        status: i <= completedDays ? "completed" : "pending",
      });
    }

    return daysArray;
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 3,
          mb: 3
        }}
      >
        <Typography variant="h4" gutterBottom>
          Active Workout Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={7} lg={8}>
            <Card
              sx={{
                borderRadius: '15px',
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)', 
                overflow: 'hidden',
              }}
            >
              <CardContent >
                <Typography variant="h6" gutterBottom color={"#B00020"}> 
                  Workout Name: {workoutPlanDetails?.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom color={"#B00020"}>
                  Difficulty: {workoutPlanDetails?.difficulty}
                </Typography>
                <Typography variant="subtitle1" gutterBottom color={"#B00020"}>
                  Duration: {workoutPlanDetails?.duration}
                </Typography>
                <Typography variant="subtitle1" gutterBottom color={"#B00020"}>
                  Notes: {workoutPlanDetails?.description}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Exercises
                </Typography>
                <List>
                  {workoutPlanDetails?.workoutPlanItems &&
                    workoutPlanDetails.workoutPlanItems.map((exercise) => (
                      <ListItem key={exercise.id}>
                        <ListItemText
                          color={"#B00020"}
                          primary={exercise?.workout.name}
                          secondary={`Sets: ${exercise?.sets}, Reps: ${exercise?.reps}, MET: ${exercise?.workout.met}`}
                        />
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={5} lg={4}>
            <Box
              component="img"
              src={"https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5008.jpg"}
              alt="workout"
              sx={{
                borderRadius: '15px',
                width: '100%',
                height: 'auto',
                objectFit: 'cover'
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <WorkoutDayCard
              onItemClick={(id, name) => {
                navigate(`/selected-day/${id}`);
              }}
              style={{ cursor: "pointer" }}
              title="Pick the day and complete the workout"
              list={getDaysArray()}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ActiveWorkoutView;
