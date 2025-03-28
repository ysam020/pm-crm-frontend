import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";
import ErrorFallback from "../../customComponents/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

function ViewResignations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cache fetched data
  const dataCache = useRef(null);

  useEffect(() => {
    async function getData() {
      // If data is already cached, use it
      if (dataCache.current) {
        setData(dataCache.current);
        return;
      }

      setLoading(true);
      try {
        const res = await apiClient(`/view-resignations`);
        setData(res.data);
        dataCache.current = res.data; // Store data in cache
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  const baseColumns = useMemo(
    () => [
      { accessorKey: "username", header: "Username" },
      { accessorKey: "reason", header: "Reason" },
      { accessorKey: "job_satisfaction", header: "Job Satisfaction" },
      { accessorKey: "support_from_manager", header: "Support From Manager" },
      {
        accessorKey: "overall_company_culture",
        header: "Overall Company Culture",
      },
      { accessorKey: "suggestions", header: "Suggestions" },
    ],
    []
  );

  const columns = useMemo(() => getTableColumns(baseColumns), [baseColumns]);
  const memoizedData = useMemo(() => data, [data]);
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

export default React.memo(ViewResignations);
