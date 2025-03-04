import React, { useContext, useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { AlertContext } from "../../../contexts/AlertContext";
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

  async function getLeaveApplications() {
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
  }

  const handleLeaveApproval = async (_id, username, status) => {
    try {
      await apiClient.put(`/update-leave-status`, { _id, username, status });

      getLeaveApplications();
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

  const columns = [
    {
      accessorKey: "username",
      header: "Username",
      size: 160,
    },
    {
      accessorKey: "from",
      header: "From",
      size: 120,
    },
    {
      accessorKey: "to",
      header: "To",
      size: 120,
    },
    {
      accessorKey: "reason",
      header: "Reason",
      size: 200,
    },
    {
      accessorKey: "sick_leave",
      header: "Sick Leave",
      size: 130,
    },
    {
      accessorKey: "medical_certificate",
      header: "Medical Certificate",
      size: 180,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
    },
    {
      accessorKey: "approve",
      header: "Action",
      size: 220,
      Cell: ({ cell }) => {
        return (
          <>
            <span
              className="link"
              onClick={() =>
                handleLeaveApproval(
                  cell.row.original._id,
                  cell.row.original.username,
                  "Approve"
                )
              }
            >
              Approve&nbsp;|&nbsp;
            </span>
            <span
              className="link"
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
        );
      },
    },
  ];

  const baseConfig = useTableConfig(data, columns, loading);

  const customToolbarActions = tableToolbarDate(date, setDate);

  const table = useMaterialReactTable({
    ...baseConfig,
    ...customToolbarActions,
  });

  useEffect(() => {
    getLeaveApplications();
    // eslint-disable-next-line
  }, [date]);

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewLeaveApplications);
