import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useNavigate } from "react-router-dom";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";
import ErrorFallback from "../../customComponents/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

function ViewKycList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Memoized API Call
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient("/view-all-kycs");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching KYC data:", error);
      alert("Failed to fetch KYC data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // Memoized Data to Prevent Unnecessary Re-renders
  const memoizedData = useMemo(() => data, [data]);

  // Table Columns
  const baseColumns = useMemo(
    () => [
      { accessorKey: "first_name", header: "First Name" },
      { accessorKey: "middle_name", header: "Middle Name" },
      { accessorKey: "last_name", header: "Last Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "kyc_approval", header: "KYC Approval" },
    ],
    []
  );

  const columns = useMemo(() => getTableColumns(baseColumns), [baseColumns]);
  const baseConfig = useTableConfig(memoizedData, columns, loading);

  // Memoized Table Instance
  const table = useMaterialReactTable(
    useMemo(
      () => ({
        ...baseConfig,
        muiTableBodyRowProps: ({ row }) => ({
          onClick: () => navigate(`/view-kyc/${row.original.username}`),
          style: { cursor: "pointer" },
        }),
      }),
      [baseConfig, navigate]
    )
  );

  return (
    <div>
      <ErrorBoundary fallback={<ErrorFallback />}>
        {loading ? (
          <p>Loading KYC data...</p>
        ) : (
          <MaterialReactTable table={table} />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default React.memo(ViewKycList);
