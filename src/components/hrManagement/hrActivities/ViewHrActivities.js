import React, { useEffect, useState, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Skeleton } from "@mui/material";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";
import ErrorFallback from "../../customComponents/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

function ViewHrActivities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // Prevent state updates if component unmounts

    async function getData() {
      setLoading(true);
      try {
        const res = await apiClient(`/get-hr-activities`);
        if (isMounted) setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    getData();
    return () => {
      isMounted = false;
    }; // Cleanup function to avoid memory leaks
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  const baseColumns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
      {
        accessorKey: "date",
        header: "Date",
        Cell: ({ cell }) => {
          const date = cell.getValue();
          const formatDate = (dateString) => {
            if (!dateString || typeof dateString !== "string") {
              return <Skeleton width="50%" />;
            }
            const [year, month, day] = dateString.split("-");
            return `${day}-${month}-${year}`;
          };

          return date ? formatDate(date) : "";
        },
      },
      {
        accessorKey: "time",
        header: "Time",
      },
    ],
    []
  );

  const columns = useMemo(() => getTableColumns(baseColumns), [baseColumns]);
  const baseConfig = useTableConfig(memoizedData, columns, loading);
  const table = useMaterialReactTable({
    ...baseConfig,
  });

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <MaterialReactTable table={table} />
    </ErrorBoundary>
  );
}

export default React.memo(ViewHrActivities);
