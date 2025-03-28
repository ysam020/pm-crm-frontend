import React, { Suspense, useContext, useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import "../../styles/dashboard.scss";
import { UserContext } from "../../contexts/UserContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../customComponents/ErrorFallback";

// Lazy-loaded components
const Info = React.lazy(() => import("./Info"));
const Attendance = React.lazy(() => import("./Attendance"));
const HrActivities = React.lazy(() => import("./HrActivities"));
const MarkAttendance = React.lazy(() => import("./MarkAttendance"));
const StickyNotes = React.lazy(() => import("./StickyNotes"));

// Reusable Suspense Wrapper
const SuspenseWrapper = React.memo(({ children }) => (
  <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
));

function Dashboard() {
  const { user } = useContext(UserContext);

  // Memoize user object to avoid unnecessary re-renders
  const memoizedUser = useMemo(() => user, [user]);

  return (
    <Box sx={{ flexGrow: 1, paddingTop: 0 }} className="dashboard">
      <Grid container spacing={1}>
        {/* Left Section */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 7 }}>
          <Grid container spacing={1}>
            {/* Info */}
            <Grid size={{ xs: 12, md: 5.5 }}>
              <SuspenseWrapper>
                <ErrorBoundary fallback={<ErrorFallback />}>
                  <Info user={memoizedUser} />
                </ErrorBoundary>
              </SuspenseWrapper>
            </Grid>
            {/* Attendance */}
            <Grid size={{ xs: 12, md: 6.5 }}>
              <SuspenseWrapper>
                <ErrorBoundary fallback={<ErrorFallback />}>
                  <Attendance />
                </ErrorBoundary>
              </SuspenseWrapper>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            {/* HR Activities */}
            <Grid size={12}>
              <SuspenseWrapper>
                <ErrorBoundary fallback={<ErrorFallback />}>
                  <HrActivities />
                </ErrorBoundary>
              </SuspenseWrapper>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 12 }}>
              <SuspenseWrapper>
                <ErrorBoundary fallback={<ErrorFallback />}>
                  <StickyNotes />
                </ErrorBoundary>
              </SuspenseWrapper>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Section */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 5 }}>
          <Grid container spacing={1}>
            {/* Notifications */}
            <Grid size={12}>
              <SuspenseWrapper>
                <ErrorBoundary fallback={<ErrorFallback />}>
                  <MarkAttendance />
                </ErrorBoundary>
              </SuspenseWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(Dashboard);
