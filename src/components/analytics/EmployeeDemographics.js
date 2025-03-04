import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import EmployeeDepartments from "./EmployeeDepartments";
import EmployeeDesignations from "./EmployeeDesignations";
import AgeDistribution from "./AgeDistribution";
import JoiningInfo from "./JoiningInfo";
import "../../styles/dashboard.scss";
import { ThemeContext } from "../../contexts/ThemeContext";

function EmployeeDemographics() {
  const { theme } = React.useContext(ThemeContext);
  return (
    <Box sx={{ flexGrow: 1, paddingTop: 0 }} className="dashboard">
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 6 }}>
          <EmployeeDepartments theme={theme} />
        </Grid>
        <Grid size={6}>
          <AgeDistribution theme={theme} />
        </Grid>
      </Grid>

      <Grid container>
        <Grid size={{ xs: 12, md: 12 }}>
          <EmployeeDesignations theme={theme} />
        </Grid>
      </Grid>

      <Grid container>
        <Grid size={{ xs: 12, md: 12 }}>
          <JoiningInfo theme={theme} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default EmployeeDemographics;
