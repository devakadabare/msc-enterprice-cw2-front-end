// eslint-disable-next-line import/no-anonymous-default-export
export default {
  BASE_URL: "https://fitnessappapigateway.azurewebsites.net",

  //User Service
  USER_REGISTER: "/user/User/create",
  USER_LOGIN: "/user/User/login",
  WEIGHT: "/user/UserWeight",
  ALL_WEIGHT: "/user/UserWeight/all",
  LAST_WEIGHT: "/user/UserWeight/latestWeight",
  CHEAT_MEAL: "/user/CheatMeal",
  // Workout Service
  WORKOUT_PLAN: "/workout/WorkoutPlan",
  WORKOUT_PLAN_ENROLL: "workout/UserWorkoutEnrollment/single",
  WORKOUT: "/workout/Workout",
  USER_ENROLLED_WORKOUT_PLAN: "/workout/UserWorkoutEnrollment/user",
  COMPLETE_WORKOUT: "workout/UserWorkoutEnrollment/complete",
  REPORT: "/workout/Report",
  PREDICTION: "/workout/Prediction",
};
