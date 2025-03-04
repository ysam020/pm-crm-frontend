import React from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";

function ViewJobOpenings() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await apiClient(`/view-job-openings`);
        setData(res.data);
      } catch (error) {
        console.error("Error occurred while fetching job openings:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const baseColumns = [
    {
      accessorKey: "jobTitle",
      header: "Job Title",
    },
    {
      accessorKey: "jobPostingDate",
      header: "Job Posting Date",
      Cell: ({ cell }) => {
        return (
          <>
            {new Date(cell.row.original.jobPostingDate).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }
            ) === "Invalid Date" ? (
              <Skeleton width="50%" />
            ) : (
              new Date(cell.row.original.jobPostingDate).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }
              )
            )}
          </>
        );
      },
    },
    {
      accessorKey: "applicationDeadline",
      header: "Application Deadline",

      Cell: ({ cell }) => {
        return (
          <>
            {new Date(cell.row.original.applicationDeadline).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }
            ) === "Invalid Date" ? (
              <Skeleton width="50%" />
            ) : (
              new Date(
                cell.row.original.applicationDeadline
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            )}
          </>
        );
      },
    },
    {
      accessorKey: "numberOfVacancies",
      header: "Number of Vacancies",
    },
    {
      accessorKey: "candidatesHired",
      header: "Candidates Hired",
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "budget",
      header: "Budget",
      Cell: ({ cell }) => {
        return (
          <>
            {!cell.row.original.budget[0] ? (
              <Skeleton width="50%" />
            ) : (
              `${cell.row.original.budget[0]} LPA`
            )}{" "}
            -
            {!cell.row.original.budget[1] ? (
              <Skeleton width="50%" />
            ) : (
              `${cell.row.original.budget[1]} LPA`
            )}
          </>
        );
      },
    },
  ];

  const columns = getTableColumns(baseColumns);
  const baseConfig = useTableConfig(data, columns, loading);
  const tableBodyProps = {
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => navigate(`/view-job-opening/${row.original._id}`),
      style: { cursor: "pointer" }, // Change cursor to pointer on hover
    }),
  };
  const table = useMaterialReactTable({ ...baseConfig, ...tableBodyProps });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewJobOpenings);
