import PropTypes from "prop-types";
import {
  Box,
  Card,
  Paper,
  Typography,
  CardHeader,
  CardContent,
} from "@mui/material";
import Iconify from "./../iconify";

SelectWorkoutPlanCard.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default function SelectWorkoutPlanCard({
  title,
  subheader,
  list,
  onItemClick,
  selectedPlan,
  checkUserAlreadyEnrolled,
  ...other
}) {
  return (
    <Card 
      {...other}
      sx={{ 
        borderRadius: '15px',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)', 
        overflow: 'hidden' 
      }}
    >
      <CardHeader 
        title={title} 
        subheader={subheader} 
        titleTypographyProps={{ variant:'h6' }}
        subheaderTypographyProps={{ variant:'subtitle2' }}
      />

      <CardContent>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "auto",
          }}
        >
          {list.map((site) => (
            <Paper
              key={site.name}
              variant="outlined"
              sx={{
                py: 2.5,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: checkUserAlreadyEnrolled(site?.id)
                  ? "#e8e8e8"
                  : "white",
                borderRadius: '8px',
                borderColor: '#B00020',
                borderWidth: '2px',
              }}
              onClick={() => onItemClick(site.id, site.name)}
            >
              <Box sx={{ mb: 0.5 }}>
                <Iconify
                  icon={"ion:fitness-outline"}
                  color="#B00020"
                  width={50}
                />
              </Box>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {site.name} - {site.difficulty}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
