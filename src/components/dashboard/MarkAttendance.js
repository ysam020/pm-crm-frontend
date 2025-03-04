import React, { Suspense, useContext, useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { AlertContext } from "../../contexts/AlertContext";
import { Skeleton } from "@mui/material";
import apiClient from "../../config/axiosConfig";
import Grid from "@mui/material/Grid2";
const CustomCalendar = React.lazy(() => import("../customComponents/Calendar"));

function MarkAttendance() {
  const [attendances, setAttendances] = useState([]);
  const [disableFields, setDisableFields] = useState({
    timeIn: false,
    timeOut: false,
  });
  const [todayTimeIn, setTodayTimeIn] = useState("");
  const [todayTimeOut, setTodayTimeOut] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const { setAlert } = useContext(AlertContext);

  async function getAttendances() {
    setLoading(true);
    try {
      const res = await apiClient.get(`/get-attendances/${month + 1}/${year}`, {
        withCredentials: true,
      });
      setAttendances(res.data);

      const currentDate = new Date().setHours(0, 0, 0, 0);

      const todayAttendance = res.data?.find((attendance) => {
        const attendanceDate = new Date(attendance.date).setHours(0, 0, 0, 0);
        return attendanceDate === currentDate;
      });

      if (todayAttendance) {
        setTodayTimeIn(todayAttendance.timeIn);
        setTodayTimeOut(todayAttendance.timeOut);

        setDisableFields({
          timeIn: !!todayAttendance.timeIn,
          timeOut: !!todayAttendance.timeOut,
        });
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAttendances();
    // eslint-disable-next-line
  }, [month, year]);

  const addAttendance = async (field) => {
    const { addAttendance } = await import("../../utils/addAttendance");
    addAttendance(field, setAlert, getAttendances);
  };

  return (
    <Grid container className="dashboard-container mark-attendance">
      <Grid size={{ xs: 12, md: 5 }}>
        <h2>
          <strong>My Attendances</strong>
        </h2>
        <br />
        {!disableFields.timeIn && (
          <>
            <button
              onClick={() => addAttendance("timeIn")}
              className="btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AccessTimeIcon sx={{ fontSize: "20px", marginRight: "5px" }} />
              Punch In
            </button>
            <br />
          </>
        )}
        {disableFields.timeIn && !disableFields.timeOut && (
          <>
            <button onClick={() => addAttendance("timeOut")} className="btn">
              <AccessTimeIcon sx={{ fontSize: "20px", marginRight: "5px" }} />
              Punch Out
            </button>
            <br />
          </>
        )}

        {loading ? (
          <Skeleton variant="text" width={100} />
        ) : (
          <p>
            <strong>Time In:</strong> {todayTimeIn || "Not recorded yet"}
          </p>
        )}
        {loading ? (
          <Skeleton variant="text" width={100} />
        ) : (
          <p>
            <strong>Time Out:</strong> {todayTimeOut || "Not recorded yet"}
          </p>
        )}
      </Grid>

      <Grid size={{ xs: 12, md: 7 }}>
        <Suspense fallback={<div>Loading...</div>}>
          <CustomCalendar
            attendances={attendances}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            currentDate={currentDate}
          />
        </Suspense>
      </Grid>
    </Grid>
  );
}

export default React.memo(MarkAttendance);
