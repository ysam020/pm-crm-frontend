import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import apiClient from "../../../config/axiosConfig";
import { getTableColumns } from "../../../utils/table/getTableColumns";
import { tableToolbarAutoComplete } from "../../../utils/table/tableToolbarAutoComplete";
import useUserList from "../../../hooks/useUserList";

function ViewWarningMemos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userList = useUserList();
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    async function getData() {
      if (selectedUser) {
        setLoading(true);
        try {
          const res = await apiClient(`/view-warning-memos/${selectedUser}`);
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

  const baseColumns = [
    {
      accessorKey: "subject",
      header: "Subject",
      size: 300,
    },
    {
      accessorKey: "description",
      header: "Description",
      size: 140,
    },
  ];

  const columns = getTableColumns(baseColumns);
  const baseConfig = useTableConfig(data, columns, loading);
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
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewWarningMemos);
