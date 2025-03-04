import React, { useContext, useEffect, useState } from "react";
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

  async function getWeekOffs() {
    try {
      setLoading(true);
      const [year, month] = date.split("-");
      const res = await apiClient(`/get-week-offs/${year}-${month}`);

      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleWeekOffAction = async (_id, status, username) => {
    try {
      await apiClient.put(`/update-week-off-status`, {
        _id,
        status,
        username,
      });

      getWeekOffs();
    } catch (error) {
      setAlert({
        open: true,
        message:
          error.message === "Network Error"
            ? "Network Error, your details will be submitted when you are back online"
            : error.response.data.message,
        severity: "error",
      });
    }
  };

  const baseColumns = [
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "date",
      header: "Date",
      Cell: ({ cell }) => {
        return (
          <>
            {new Date(cell.row.original.date)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-") === "Invalid Date" ? (
              <Skeleton width="60%" />
            ) : (
              <>
                {new Date(cell.row.original.date)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, "-")}
              </>
            )}
          </>
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
      Cell: ({ cell }) => {
        return (
          <>
            <span
              className="link"
              onClick={() =>
                handleWeekOffAction(
                  cell.row.original._id,
                  "Approve",
                  cell.row.original.username
                )
              }
            >
              Approve&nbsp;|&nbsp;
            </span>
            <span
              className="link"
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
    getWeekOffs();
    // eslint-disable-next-line
  }, [date]);

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewLeaveApplications);
