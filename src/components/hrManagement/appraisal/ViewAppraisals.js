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

  const baseColumns = [
    {
      accessorKey: "appraisalDate",
      header: "Appraisal Date",
    },
    {
      accessorKey: "areasOfImprovement",
      header: "Areas of Improvement",
    },
    {
      accessorKey: "feedback",
      header: "Feedback",
    },
    {
      accessorKey: "performanceScore",
      header: "Performance Score",
    },
    {
      accessorKey: "strengths",
      header: "Strengths",
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

export default React.memo(ViewAppraisals);
