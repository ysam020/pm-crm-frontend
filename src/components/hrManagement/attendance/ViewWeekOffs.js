import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Skeleton } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { AlertContext } from "../../../contexts/AlertContext";
import { getTableColumns } from "../../../utils/table/getTableColumns";
import { tableToolbarDate } from "../../../utils/table/tableToolbarDate";
import ErrorFallback from "../../customComponents/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

function ViewLeaveApplications() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setAlert } = useContext(AlertContext);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  // Fetch week offs
  const getWeekOffs = useCallback(async () => {
    try {
      setLoading(true);
      const [year, month] = date.split("-");
      const res = await apiClient(`/get-week-offs/${year}-${month}`);
      setData(res.data);
    } catch (error) {
      console.error(error);
      setAlert({
        open: true,
        message: "Failed to fetch week offs. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [date, setAlert]);

  // Handle approve/reject action
  const handleWeekOffAction = useCallback(
    async (_id, status, username) => {
      try {
        await apiClient.put(`/update-week-off-status`, {
          _id,
          status,
          username,
        });
        getWeekOffs(); // Refresh data after action
      } catch (error) {
        setAlert({
          open: true,
          message:
            error.message === "Network Error"
              ? "Network Error, changes will be submitted when you're back online."
              : error.response?.data?.message || "Something went wrong.",
          severity: "error",
        });
      }
    },
    [getWeekOffs, setAlert]
  );

  // Define table columns using useMemo
  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "date",
        header: "Date",
        Cell: ({ cell }) => {
          const formattedDate = new Date(cell.row.original.date)
            .toLocaleDateString("en-GB")
            .replace(/\//g, "-");

          return formattedDate === "Invalid Date" ? (
            <Skeleton width="60%" />
          ) : (
            <>{formattedDate}</>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "approve",
        header: "Action",
        Cell: ({ cell }) => (
          <>
            <span
              className="link approve-link"
              onClick={() =>
                handleWeekOffAction(
                  cell.row.original._id,
                  "Approve",
                  cell.row.original.username
                )
              }
            >
              Approve
            </span>
            <span
              className="link reject-link"
              onClick={() =>
                handleWeekOffAction(
                  cell.row.original._id,
                  "Reject",
                  cell.row.original.username
                )
              }
            >
              Reject
            </span>
          </>
        ),
      },
    ];
    return getTableColumns(baseColumns);
  }, [handleWeekOffAction]);

  const baseConfig = useTableConfig(data, columns, loading);
  const customToolbarActions = tableToolbarDate(date, setDate);
  const table = useMaterialReactTable({
    ...baseConfig,
    ...customToolbarActions,
  });

  // Fetch data when `date` changes
  useEffect(() => {
    getWeekOffs();
  }, [getWeekOffs]);

  return (
    <div>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <MaterialReactTable table={table} />
      </ErrorBoundary>
    </div>
  );
}

export default React.memo(ViewLeaveApplications);
