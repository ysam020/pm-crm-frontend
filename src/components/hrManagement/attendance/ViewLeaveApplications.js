import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { AlertContext } from "../../../contexts/AlertContext";
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

  const getLeaveApplications = useCallback(async () => {
    setLoading(true);
    try {
      const [year, month] = date.split("-");
      const res = await apiClient(`/get-leave-applications/${year}-${month}`);
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    getLeaveApplications();
  }, [getLeaveApplications]);

  const handleLeaveApproval = useCallback(
    async (_id, username, status) => {
      try {
        await apiClient.put(`/update-leave-status`, { _id, username, status });
        getLeaveApplications();
      } catch (error) {
        setAlert({
          open: true,
          message:
            error.message === "Network Error"
              ? "Network Error, your details will be submitted when you are back online"
              : error.response?.data?.message || "An error occurred",
          severity: "error",
        });
      }
    },
    [setAlert, getLeaveApplications]
  );

  // Memoized columns
  const columns = useMemo(
    () => [
      { accessorKey: "username", header: "Username", size: 160 },
      { accessorKey: "from", header: "From", size: 120 },
      { accessorKey: "to", header: "To", size: 120 },
      { accessorKey: "reason", header: "Reason", size: 200 },
      { accessorKey: "sick_leave", header: "Sick Leave", size: 130 },
      {
        accessorKey: "medical_certificate",
        header: "Medical Certificate",
        size: 180,
      },
      { accessorKey: "status", header: "Status", size: 150 },
      {
        accessorKey: "approve",
        header: "Action",
        size: 220,
        Cell: ({ cell }) => (
          <>
            <span
              className="link approve-link"
              onClick={() =>
                handleLeaveApproval(
                  cell.row.original._id,
                  cell.row.original.username,
                  "Approve"
                )
              }
            >
              Approve
            </span>
            <span
              className="link reject-link"
              onClick={() =>
                handleLeaveApproval(
                  cell.row.original._id,
                  cell.row.original.username,
                  "Reject"
                )
              }
            >
              Reject
            </span>
          </>
        ),
      },
    ],
    [handleLeaveApproval]
  );

  // Memoize API data
  const memoizedData = useMemo(() => data, [data]);

  // Call `useTableConfig` at the top level
  const tableConfig = useTableConfig(memoizedData, columns, loading);

  // Memoize toolbar actions
  const customToolbarActions = useMemo(
    () => tableToolbarDate(date, setDate),
    [date]
  );

  const table = useMaterialReactTable({
    ...tableConfig,
    ...customToolbarActions,
  });

  return (
    <div>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <MaterialReactTable table={table} />
      </ErrorBoundary>
    </div>
  );
}

export default React.memo(ViewLeaveApplications);
