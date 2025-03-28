import React, { useEffect, useState, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";
import { tableToolbarAutoComplete } from "../../../utils/table/tableToolbarAutoComplete";
import useUserList from "../../../hooks/useUserList";
import ErrorFallback from "../../customComponents/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

function ViewAppraisals() {
  const [data, setData] = useState([]);
  const userList = useUserList();
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      if (selectedUser) {
        setLoading(true);
        try {
          const res = await apiClient(`/view-appraisals/${selectedUser}`);
          setData(res.data);
        } catch (error) {
          console.error("Error occurred while fetching appraisals:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    getData();
  }, [selectedUser]);

  // Memoized data to prevent unnecessary re-renders
  const memoizedData = useMemo(() => data, [data]);

  // Memoized columns
  const baseColumns = useMemo(
    () => [
      { accessorKey: "appraisalDate", header: "Appraisal Date" },
      { accessorKey: "areasOfImprovement", header: "Areas of Improvement" },
      { accessorKey: "feedback", header: "Feedback" },
      { accessorKey: "performanceScore", header: "Performance Score" },
      { accessorKey: "strengths", header: "Strengths" },
    ],
    []
  );

  const columns = useMemo(() => getTableColumns(baseColumns), [baseColumns]);

  // Call `useTableConfig` directly (hooks should not be inside `useMemo`)
  const tableConfig = useTableConfig(memoizedData, columns, loading);

  // Memoize toolbar actions
  const customToolbarActions = useMemo(
    () => tableToolbarAutoComplete(selectedUser, setSelectedUser, userList),
    [selectedUser, userList]
  );

  const table = useMaterialReactTable({
    ...tableConfig,
    ...customToolbarActions,
  });

  return (
    <div>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <MaterialReactTable table={table} />
      </ErrorBoundary>
    </div>
  );
}

export default React.memo(ViewAppraisals);
