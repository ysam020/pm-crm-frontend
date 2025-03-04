import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import "../../styles/dashboard.scss";
import { UserContext } from "../../contexts/UserContext";

// Lazy-loaded components
const Info = React.lazy(() => import("./Info"));
const Attendance = React.lazy(() => import("./Attendance"));
const HrActivities = React.lazy(() => import("./HrActivities"));
const MarkAttendance = React.lazy(() => import("./MarkAttendance"));
const Notifications = React.lazy(() => import("./Notifications"));
const StickyNotes = React.lazy(() => import("./StickyNotes"));

// Reusable Suspense Wrapper
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
);

function Dashboard() {
  const { user } = React.useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1, paddingTop: 0 }} className="dashboard">
      <Grid container spacing={1}>
        {/* Left Section */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 8 }}>
          <Grid container spacing={1}>
            {/* Info */}
            <Grid size={{ xs: 12, md: 5 }}>
              <SuspenseWrapper>
                <Info user={user} />
              </SuspenseWrapper>
            </Grid>
            {/* Attendance */}
            <Grid size={{ xs: 12, md: 7 }}>
              <SuspenseWrapper>
                <Attendance />
              </SuspenseWrapper>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            {/* HR Activities */}
            <Grid size={12}>
              <SuspenseWrapper>
                <HrActivities />
              </SuspenseWrapper>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            {/* Mark Attendance */}
            <Grid size={12}>
              <SuspenseWrapper>
                <MarkAttendance />
              </SuspenseWrapper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Section */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
          <Grid container spacing={1}>
            {/* Notifications */}
            <Grid size={12}>
              <SuspenseWrapper>
                <Notifications />
              </SuspenseWrapper>
            </Grid>
            {/* Sticky Notes */}
            <Grid size={12}>
              <SuspenseWrapper>
                <StickyNotes />
              </SuspenseWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(Dashboard);
