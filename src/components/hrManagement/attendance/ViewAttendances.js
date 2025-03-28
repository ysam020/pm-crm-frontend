import React, { useEffect, useState, useMemo } from "react";
import { Skeleton } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";
import { tableToolbarDate } from "../../../utils/table/tableToolbarDate";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../customComponents/ErrorFallback";

function ViewAttendances() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAttendances() {
      setLoading(true);
      try {
        const [month, year] = date.split("-");
        const res = await apiClient(`/get-all-attendances/${month}/${year}`);
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getAttendances();
  }, [date]);

  // Memoize data
  const memoizedData = useMemo(() => data, [data]);

  // Memoize columns
  const baseColumns = useMemo(
    () => [
      { accessorKey: "username", header: "Username" },
      { accessorKey: "presents", header: "Presents" },
      { accessorKey: "halfDays", header: "Half Days" },
      { accessorKey: "weekOffs", header: "Week Offs" },
      { accessorKey: "leaves", header: "Total Leaves" },
      {
        accessorKey: "paidLeaves",
        header: "Paid Leaves",
        Cell: ({ cell }) => {
          const leaves = cell.row.original.leaves;
          return isNaN(leaves) ? (
            <Skeleton width="80%" />
          ) : (
            <>{Math.min(leaves, process.env.REACT_APP_MONTHLY_PAID_LEAVES)}</>
          );
        },
      },
      {
        accessorKey: "unpaidLeaves",
        header: "Unpaid Leaves",
        Cell: ({ cell }) => {
          const leaves = cell.row.original.leaves;
          return isNaN(leaves) ? (
            <Skeleton width="80%" />
          ) : (
            <>
              {Math.max(0, leaves - process.env.REACT_APP_MONTHLY_PAID_LEAVES)}
            </>
          );
        },
      },
    ],
    []
  );

  const columns = useMemo(() => getTableColumns(baseColumns), [baseColumns]);

  // Call `useTableConfig` directly (hooks cannot be inside `useMemo`)
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

export default React.memo(ViewAttendances);
