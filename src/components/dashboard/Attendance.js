import React, { useEffect, useState, useMemo } from "react";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import apiClient from "../../config/axiosConfig";

function Attendance() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const res = await apiClient(`/get-attendance-summary`, {
          withCredentials: true,
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching attendance summary:", error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  // Memoized data to avoid unnecessary recalculations
  const memoizedData = useMemo(() => data, [data]);

  // Memoized InfoCol component
  const InfoCol = useMemo(
    () =>
      ({ label, value, className }) =>
        (
          <Grid size={4} className={className}>
            {loading ? (
              <Skeleton variant="text" width="30%" />
            ) : (
              <span className={className}>{value}</span>
            )}
            <p className={`${className}-label`}>{label}</p>
          </Grid>
        ),
    [loading]
  );

  return (
    <div
      onClick={() => navigate("/attendance")}
      style={{ cursor: "pointer" }}
      className="dashboard-container attendance"
    >
      <h2 className="attendance-title">
        <strong>Attendance and Leaves</strong>
      </h2>

      <Grid container className="attendance-row attendance-row-1">
        <InfoCol
          label="Working Days"
          value={memoizedData?.workingDays}
          className="working-days"
        />
        <InfoCol
          label="Presents"
          value={memoizedData?.presents}
          className="presents"
        />
        <InfoCol
          label="Leaves"
          value={memoizedData?.leaves}
          className="leaves"
        />
      </Grid>
      <Grid container className="attendance-row attendance-row-2">
        <InfoCol
          label="Paid Leaves"
          value={memoizedData?.paidLeaves}
          className="paid-leaves"
        />
        <InfoCol
          label="Unpaid Leaves"
          value={memoizedData?.unpaidLeaves}
          className="unpaid-leaves"
        />
        <InfoCol
          label="Week Offs"
          value={memoizedData?.weekOffs}
          className="week-offs"
        />
      </Grid>
    </div>
  );
}

export default React.memo(Attendance);
