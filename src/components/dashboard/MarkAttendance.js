import React, {
  Suspense,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { AlertContext } from "../../contexts/AlertContext";
import { Skeleton } from "@mui/material";
import apiClient from "../../config/axiosConfig";
const CustomCalendar = React.lazy(() => import("../customComponents/Calendar"));

function MarkAttendance() {
  const [attendances, setAttendances] = useState([]);
  const [todayTimeIn, setTodayTimeIn] = useState("");
  const [todayTimeOut, setTodayTimeOut] = useState("");
  const [loading, setLoading] = useState(true);
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
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAttendances();
    // eslint-disable-next-line
  }, [month, year]);

  // Memoize API data to avoid unnecessary re-computations
  const memoizedAttendances = useMemo(() => attendances, [attendances]);

  // Memoize today's attendance details
  const todayAttendance = useMemo(() => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    return memoizedAttendances.find((attendance) => {
      const attendanceDate = new Date(attendance.date).setHours(0, 0, 0, 0);
      return attendanceDate === currentDate;
    });
  }, [memoizedAttendances]);

  useEffect(() => {
    if (todayAttendance) {
      setTodayTimeIn(todayAttendance.timeIn);
      setTodayTimeOut(todayAttendance.timeOut);
    }
  }, [todayAttendance]);

  // Memoize disableFields state to prevent unnecessary re-renders
  const disableFields = useMemo(
    () => ({
      timeIn: !!todayTimeIn,
      timeOut: !!todayTimeOut,
    }),
    [todayTimeIn, todayTimeOut]
  );

  const addAttendance = async (field) => {
    const { addAttendance } = await import("../../utils/addAttendance");
    addAttendance(field, setAlert, getAttendances);
  };

  return (
    <div className="dashboard-container mark-attendance">
      <h2>
        <strong>My Attendances</strong>
      </h2>
      <div className="flex-div">
        <div style={{ flex: 1 }}>
          {!disableFields.timeIn && (
            <>
              <button onClick={() => addAttendance("timeIn")} className="btn">
                <AccessTimeIcon sx={{ fontSize: "20px", marginRight: "5px" }} />
                Punch In
              </button>
            </>
          )}
          {disableFields.timeIn && !disableFields.timeOut && (
            <button onClick={() => addAttendance("timeOut")} className="btn">
              <AccessTimeIcon sx={{ fontSize: "20px", marginRight: "5px" }} />
              Punch Out
            </button>
          )}
        </div>

        <div>
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
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <CustomCalendar
          attendances={memoizedAttendances}
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
          currentDate={currentDate}
        />
      </Suspense>
    </div>
  );
}

export default React.memo(MarkAttendance);
