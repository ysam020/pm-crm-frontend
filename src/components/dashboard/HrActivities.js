import React, { useState, useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Skeleton } from "@mui/material";
import useTableConfig from "../../hooks/useTableConfig";
import apiClient from "../../config/axiosConfig";
import { getTableColumns } from "../../utils/table/getTableColumns";

function HrActivities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const res = await apiClient(`/get-hr-activities`);
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  // Memoize columns
  const memoizedColumns = useMemo(
    () =>
      getTableColumns([
        { accessorKey: "title", header: "Title" },
        { accessorKey: "description", header: "Description" },
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
        { accessorKey: "time", header: "Time" },
      ]),
    []
  );

  // Call useTableConfig at the top level
  const baseConfig = useTableConfig(data, memoizedColumns, loading);

  // Memoize the table configuration object
  const memoizedTableConfig = useMemo(() => {
    return { ...baseConfig, enableTopToolbar: false };
  }, [baseConfig]);

  const table = useMaterialReactTable(memoizedTableConfig);

  return (
    <div className="dashboard-container hr-activities">
      <h2>
        <strong>HR Activities</strong>
      </h2>
      <br />
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(HrActivities);
