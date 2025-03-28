import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";
import ErrorFallback from "../../customComponents/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

function ViewJobOpenings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Memoized API call function
  const getData = useCallback(async () => {
    if (data.length) return; // Prevent re-fetching if data already exists
    setLoading(true);
    try {
      const res = await apiClient(`/view-job-openings`);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching job openings:", error);
    } finally {
      setLoading(false);
    }
  }, [data.length]);

  useEffect(() => {
    getData();
  }, [getData]);

  // Memoizing processed data
  const memoizedData = useMemo(() => data, [data]);

  const baseColumns = useMemo(
    () => [
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
              {new Date(
                cell.row.original.applicationDeadline
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }) === "Invalid Date" ? (
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
    ],
    []
  );

  const columns = useMemo(() => getTableColumns(baseColumns), [baseColumns]);
  const baseConfig = useTableConfig(memoizedData, columns, loading);

  const tableBodyProps = {
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => navigate(`/view-job-opening/${row.original._id}`),
      style: { cursor: "pointer" },
    }),
  };

  const table = useMaterialReactTable({ ...baseConfig, ...tableBodyProps });

  return (
    <div>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <MaterialReactTable table={table} />
      </ErrorBoundary>
    </div>
  );
}

export default React.memo(ViewJobOpenings);
