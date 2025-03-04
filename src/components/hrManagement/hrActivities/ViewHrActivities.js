import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Skeleton } from "@mui/material";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";

function ViewHrActivities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
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

  const baseColumns = [
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
  ];

  const columns = getTableColumns(baseColumns);
  const baseConfig = useTableConfig(data, columns, loading);
  const table = useMaterialReactTable({
    ...baseConfig,
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewHrActivities);
