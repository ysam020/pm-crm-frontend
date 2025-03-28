import React, { useEffect, useState, useMemo, useRef } from "react";
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

function ViewTrainings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userList = useUserList();
  const [selectedUser, setSelectedUser] = useState("");

  // Cache for fetched data
  const dataCache = useRef(new Map());

  useEffect(() => {
    async function getData() {
      if (selectedUser) {
        // Check if data is already cached
        if (dataCache.current.has(selectedUser)) {
          setData(dataCache.current.get(selectedUser));
          return;
        }

        setLoading(true);
        try {
          const res = await apiClient(`/view-trainings/${selectedUser}`);
          setData(res.data);
          dataCache.current.set(selectedUser, res.data); // Cache the data
        } catch (error) {
          console.error("Error occurred while fetching appraisals:", error);
        } finally {
          setLoading(false);
        }
      }
    }

    getData();
  }, [selectedUser]);

  const baseColumns = useMemo(() => {
    return [
      { accessorKey: "trainingProgram", header: "Training Program" },
      { accessorKey: "trainingDate", header: "Training Date" },
      { accessorKey: "trainingProvider", header: "Training Provider" },
      { accessorKey: "duration", header: "Duration" },
      { accessorKey: "feedback", header: "Feedback" },
    ];
  }, []);

  const columns = useMemo(() => getTableColumns(baseColumns), [baseColumns]);
  const memoizedData = useMemo(() => data, [data]);
  const baseConfig = useTableConfig(memoizedData, columns, loading);
  const customToolbarActions = tableToolbarAutoComplete(
    selectedUser,
    setSelectedUser,
    userList
  );
  const table = useMaterialReactTable({
    ...baseConfig,
    ...customToolbarActions,
  });

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <MaterialReactTable table={table} />
    </ErrorBoundary>
  );
}

export default React.memo(ViewTrainings);
