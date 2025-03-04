import React, { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";
import { tableToolbarDate } from "../../../utils/table/tableToolbarDate";

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

  const baseColumns = [
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "presents",
      header: "Presents",
    },
    {
      accessorKey: "halfDays",
      header: "Half Days",
    },
    {
      accessorKey: "weekOffs",
      header: "Week Offs",
    },
    {
      accessorKey: "leaves",
      header: "Total Leaves",
    },
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
          <>{Math.max(0, leaves - process.env.REACT_APP_MONTHLY_PAID_LEAVES)}</>
        );
      },
    },
  ];

  const columns = getTableColumns(baseColumns);
  const baseConfig = useTableConfig(data, columns, loading);

  const customToolbarActions = tableToolbarDate(date, setDate);

  const table = useMaterialReactTable({
    ...baseConfig,
    ...customToolbarActions,
  });

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

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewAttendances);
